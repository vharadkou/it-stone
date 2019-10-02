package handlers

import (
	"it-stone-server/adapters/converters"
	"it-stone-server/helpers"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/user"
	"net/http"

	"github.com/go-openapi/runtime/middleware"
)

type UsersHandler interface {
	GetUser(params user.GetUserParams) middleware.Responder
	UpdateUser(params user.UpdateUserParams) middleware.Responder
	DeleteUser(params user.DeleteUserParams) middleware.Responder
	GetUserByToken(token *models.Token) middleware.Responder
}

type usersHandler struct {
	uc        converters.UserConverter
	jwtHelper helpers.JWTHelper
}

func NewUsersHandler() UsersHandler {
	return &usersHandler{
		uc:        converters.NewUserConverter(),
		jwtHelper: helpers.NewJWTHelper(),
	}
}

var idField = "id"

func (h *usersHandler) GetUser(params user.GetUserParams) middleware.Responder {
	userRepository := repository.NewUserRepository()
	domainUser, err := userRepository.GetUserByField(idField, params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewGetUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewGetUserOK().WithPayload(h.uc.FromDomain(domainUser))
}

func (h *usersHandler) GetUserByToken(token *models.Token) middleware.Responder {

	domainUser, err := h.jwtHelper.GetDomainUserFromToken(token)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewGetUserByTokenDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}
	return user.NewGetUserByTokenOK().WithPayload(h.uc.FromDomain(domainUser))
}
func (h *usersHandler) UpdateUser(params user.UpdateUserParams) middleware.Responder {

	userRepository := repository.NewUserRepository()
	domainUser, err := userRepository.UpdateUser(params.ID, h.uc.ToDomain(params.User))

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewUpdateUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewUpdateUserOK().WithPayload(h.uc.FromDomain(domainUser))
}
func (h *usersHandler) DeleteUser(params user.DeleteUserParams) middleware.Responder {
	userRepository := repository.NewUserRepository()
	err := userRepository.DeleteUser(params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewDeleteUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewDeleteUserOK()
}
