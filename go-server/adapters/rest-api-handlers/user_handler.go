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
	userRepository repository.UserRepository
	userConverter  converters.UserConverter
	jwtHelper      helpers.JWTHelper
}

func NewUsersHandler(userRepository repository.UserRepository) UsersHandler {
	return &usersHandler{
		userRepository: userRepository,
		userConverter:  converters.NewUserConverter(),
		jwtHelper:      helpers.NewJWTHelper(),
	}
}

var idField = "id"

func (h *usersHandler) GetUser(params user.GetUserParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	domainUser, err := h.userRepository.GetUserByField(ctx, idField, params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewGetUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewGetUserOK().WithPayload(h.userConverter.FromDomain(domainUser))
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
	return user.NewGetUserByTokenOK().WithPayload(h.userConverter.FromDomain(domainUser))
}
func (h *usersHandler) UpdateUser(params user.UpdateUserParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	domainUser, err := h.userRepository.UpdateUser(ctx, params.ID, h.userConverter.ToDomain(params.User))

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewUpdateUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewUpdateUserOK().WithPayload(h.userConverter.FromDomain(domainUser))
}
func (h *usersHandler) DeleteUser(params user.DeleteUserParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	err := h.userRepository.DeleteUser(ctx, params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewDeleteUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewDeleteUserOK()
}
