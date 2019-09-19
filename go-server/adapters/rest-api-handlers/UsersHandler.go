package handlers

import (
	"github.com/go-openapi/runtime/middleware"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/user"
	"net/http"
)

type UsersHandler interface {
	GetUser(params user.GetUserParams) middleware.Responder
	UpdateUser(params user.UpdateUserParams) middleware.Responder
	DeleteUser(params user.DeleteUserParams) middleware.Responder
}

type usersHandler struct {
}

func NewUsersHandler() UsersHandler {
	return &usersHandler{}
}

func (h *usersHandler) GetUser(params user.GetUserParams) middleware.Responder {

	userRepository := repository.NewUserRepository()
	u, err := userRepository.GetUser(params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewGetUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewGetUserOK().WithPayload(u)
}
func (h *usersHandler) UpdateUser(params user.UpdateUserParams) middleware.Responder {

	userRepository := repository.NewUserRepository()
	u, err := userRepository.UpdateUser(params.ID, params.User)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewUpdateUserDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewUpdateUserOK().WithPayload(u)
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
