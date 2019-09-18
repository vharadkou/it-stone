package handlers

import (
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/user"
	"log"
	"net/http"

	errors "github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
)

type UsersHandler interface {
	GetUser(params user.GetV0UsersUserIDParams) middleware.Responder
	ChangeUser(params user.PutV0UsersUserIDParams) middleware.Responder
	DeleteUser(params user.DeleteV0UsersUserIDParams) middleware.Responder

	OAuthSecurity(token string) (*models.Principal, error)
	CallbackUserAndToken(r *http.Request) (*models.UserToken, error)
	LoginUser(r *http.Request) middleware.Responder
}

type usersHandler struct {
}

func NewUsersHandler() UsersHandler {
	return &usersHandler{}
}

func (h *usersHandler) GetUser(params user.GetV0UsersUserIDParams) middleware.Responder {

	userRepository := repository.NewUserRepository()
	u, err := userRepository.GetUser(params.UserID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewGetV0UsersUserIDDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewGetV0UsersUserIDOK().WithPayload(u)
}

func (h *usersHandler) ChangeUser(params user.PutV0UsersUserIDParams) middleware.Responder {

	userRepository := repository.NewUserRepository()
	u, err := userRepository.UpdateUser(params.UserID, params.Body)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewPutV0UsersUserIDDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewPutV0UsersUserIDOK().WithPayload(u)
}
func (h *usersHandler) DeleteUser(params user.DeleteV0UsersUserIDParams) middleware.Responder {
	userRepository := repository.NewUserRepository()
	err := userRepository.DeleteUser(params.UserID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return user.NewDeleteV0UsersUserIDDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return user.NewDeleteV0UsersUserIDOK()
}

func (h *usersHandler) OAuthSecurity(token string) (*models.Principal, error) {
	ok, err := authenticated(token)
	if err != nil {
		return nil, errors.New(401, "error authenticate")
	}
	if !ok {
		return nil, errors.New(401, "invalid token")
	}
	prin := models.Principal(token)
	return &prin, nil
}

func (h *usersHandler) CallbackUserAndToken(r *http.Request) (*models.UserToken, error) {
	token, err := callback(r)
	if err != nil {
		return nil, err
	}
	log.Println("Token enter: ", token)
	userGoogle, err := GetGooglesUser(token)

	var totalGames, winGames int64 = 1, 1

	var us models.User
	us.UserID = userGoogle.Sub
	us.UserName = userGoogle.Name
	us.FirstName = userGoogle.GivenName
	us.LastName = userGoogle.FamilyName
	us.Email = userGoogle.Email
	us.TotalGames = totalGames
	us.WinGames = winGames

	var usToken models.UserToken
	usToken.Token = token
	usToken.User = &us

	userRepository := repository.NewUserRepository()

	if _, err := userRepository.GetUser(us.UserID); err != nil {
		err = userRepository.InsertUser(&us)
		if err != nil {
			return nil, err
		}
		log.Println("User added: ", us)
	}

	return &usToken, err
}
func (h *usersHandler) LoginUser(r *http.Request) middleware.Responder {
	return login(r)
}
