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
	GetUsers(params user.GetUsersParams) middleware.Responder
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

func (h *usersHandler) GetUser(params user.GetUserParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	domainUser, err := h.userRepository.GetUserByField(ctx, "id", params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewGetUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewGetUserOK().WithPayload(h.userConverter.FromDomain(domainUser))
}

func (h *usersHandler) GetUsers(params user.GetUsersParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	domainUsers, err := h.userRepository.GetUsers(ctx)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewGetUsersDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	var modelUsers []*models.User
	for _, model := range domainUsers {
		modelUser := h.userConverter.FromDomain(model)
		modelUsers = append(modelUsers, modelUser)
	}

	return user.NewGetUsersOK().WithPayload(modelUsers)
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

	domainUser, err := h.userRepository.UpdateUser(ctx, params.ID, h.userConverter.ToMap(params.User))

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
