package handlers

import (
	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
	"it-stone-server/models"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/registration"
)

type AuthHandler interface {
	Login(params login.LoginParams) middleware.Responder
	Registration(params registration.RegistrationParams) middleware.Responder
	APIKeyHeaderAuth(token string) (*models.Principal, error)
}

type authHandler struct{}

func NewAuthHandler() AuthHandler {
	return &authHandler{}
}

func (h *authHandler) Login(params login.LoginParams) middleware.Responder {
	return middleware.NotImplemented("operation login.Login has not yet been implemented")
}

func (h *authHandler) Registration(params registration.RegistrationParams) middleware.Responder {
	return middleware.NotImplemented("operation registration.Registration has not yet been implemented")
}

func (h *authHandler) APIKeyHeaderAuth(token string) (*models.Principal, error) {
	if token == "hello world" {
		prin := models.Principal(token)
		return &prin, nil
	}
	return nil, errors.New(401, "incorrect api key auth")
}
