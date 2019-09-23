package handlers

import (
	"it-stone-server/adapters/converters"
	"it-stone-server/domain"
	"it-stone-server/helpers"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/registration"
	"net/http"

	validateError "errors"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
)

type AuthHandler interface {
	Login(params login.LoginParams) middleware.Responder
	Registration(params registration.RegistrationParams) middleware.Responder
	APIKeyHeaderAuth(token string) (*models.Principal, error)
}

type authHandler struct {
	userConverter converters.UserConverter
	passHelper    helpers.PasswordHelper
	jwtHelper     helpers.JWTHelper
}

func NewAuthHandler() AuthHandler {
	return &authHandler{
		userConverter: converters.NewUserConverter(),
		passHelper:    helpers.NewPasswordHelper(),
		jwtHelper:     helpers.NewJWTHelper(),
	}
}

func (h *authHandler) Login(params login.LoginParams) middleware.Responder {

	if params.LoginForm == nil {
		errMsg := "The request body is empty!"
		return login.NewLoginDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	ur := repository.NewUserRepository()
	domainUser, err := ur.GetUserByField("username", *params.LoginForm.Username)
	if err != nil {
		errMsg := "User does not exists!"
		return login.NewLoginDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	if err := h.passHelper.Compare(params.LoginForm.Password.String(), domainUser.Password); err != nil {
		errMsg := "Incorrect password!"
		return login.NewLoginDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	userForToken := h.userConverter.ToUserForToken(domainUser)
	token := &models.Token{Token: h.jwtHelper.GenerateToken(userForToken)}
	return login.NewLoginOK().WithPayload(token)
}

func (h *authHandler) Registration(params registration.RegistrationParams) middleware.Responder {
	if params.RegistrationForm == nil {
		errMsg := "The request body is empty!"
		return login.NewLoginDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}
	ur := repository.NewUserRepository()

	hashedPassword, err := h.passHelper.GenerateHashPassword(params.RegistrationForm.Password.String())
	domainUser := domain.NewDomainUser(
		params.RegistrationForm.Email.String(),
		*params.RegistrationForm.Username,
		hashedPassword)

	if err := validateEmail(ur, domainUser.Email); err != nil {
		errMsg := err.Error()
		return registration.NewRegistrationDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	if err := validateUsername(ur, domainUser.Username); err != nil {
		errMsg := err.Error()
		return registration.NewRegistrationDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	err = ur.InsertUser(domainUser)

	if err != nil {
		errMsg := "Some problems with data base!"
		return registration.NewRegistrationDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return registration.NewRegistrationOK()
}

func (h *authHandler) APIKeyHeaderAuth(token string) (*models.Principal, error) {
	if h.jwtHelper.Verify(token) {
		principal := models.Principal(token)
		return &principal, nil
	}
	return nil, errors.New(http.StatusUnauthorized, "Incorrect api key auth!")
}

func validateEmail(rep repository.UserRepository, value string) error {
	user, _ := rep.GetUserByField("email", value)
	if user != nil {
		return validateError.New("user with this email is already exists")
	}
	return nil
}

func validateUsername(rep repository.UserRepository, value string) error {
	user, _ := rep.GetUserByField("username", value)
	if user != nil {
		return validateError.New("user with this username is already exists")
	}
	return nil
}
