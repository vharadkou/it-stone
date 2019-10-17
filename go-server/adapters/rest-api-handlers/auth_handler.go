package handlers

import (
	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
	"it-stone-server/adapters/converters"
	"it-stone-server/domain"
	"it-stone-server/helpers"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/registration"
	"it-stone-server/validation"
	"net/http"
)

type AuthHandler interface {
	Login(params login.LoginParams) middleware.Responder
	Registration(params registration.RegistrationParams) middleware.Responder
	APIKeyHeaderAuth(token string) (*models.Token, error)
}

type authHandler struct {
	userRepository repository.UserRepository
	userSearcher   helpers.UserSearchHelper
	userValidation validation.UserValidation
	userConverter  converters.UserConverter
	passHelper     helpers.PasswordHelper
	jwtHelper      helpers.JWTHelper
}

func NewAuthHandler(userRepository repository.UserRepository, userSearcher helpers.UserSearchHelper, userValidation validation.UserValidation) AuthHandler {
	return &authHandler{
		userRepository: userRepository,
		userSearcher:   userSearcher,
		userValidation: userValidation,

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

	ctx := params.HTTPRequest.Context()
	domainUser, err := h.userRepository.GetUserByField(ctx, h.userSearcher.SearchByUsername(), *params.LoginForm.UserName)
	if err != nil {
		errMsg := "Internal server error!"

		return login.NewLoginDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	if domainUser.ID == "" {
		errMsg := "User does not exists!"

		return login.NewLoginDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	if err := h.passHelper.Compare(*params.LoginForm.Password, domainUser.Password); err != nil {
		errMsg := "Incorrect password!"
		return login.NewLoginDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	userForToken := h.userConverter.ToUserForToken(domainUser)
	token := h.jwtHelper.GenerateToken(userForToken)
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

	hashedPassword, err := h.passHelper.GenerateHashPassword(*params.RegistrationForm.Password)
	domainUser := domain.NewDomainUser(
		params.RegistrationForm.Email.String(),
		*params.RegistrationForm.UserName,
		hashedPassword)

	ctx := params.HTTPRequest.Context()

	if err := h.userValidation.ValidateEmail(ctx, domainUser.Email); err != nil {
		errMsg := err.Error()
		return registration.NewRegistrationDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	if err := h.userValidation.ValidateUsername(ctx, domainUser.UserName); err != nil {
		errMsg := err.Error()
		return registration.NewRegistrationDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	err = h.userRepository.InsertUser(ctx, domainUser)

	if err != nil {
		errMsg := "Some problems with data base!"
		return registration.NewRegistrationDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	loginParams := login.LoginParams{
		HTTPRequest: params.HTTPRequest,
		LoginForm: &models.LoginForm{
			Password: params.RegistrationForm.Password,
			UserName: params.RegistrationForm.UserName,
		},
	}
	return h.Login(loginParams)
}

func (h *authHandler) APIKeyHeaderAuth(token string) (*models.Token, error) {
	if h.jwtHelper.Verify(token) {
		return &models.Token{Token: token}, nil
	}
	return nil, errors.New(http.StatusUnauthorized, "Incorrect api key auth!")
}
