// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"it-stone-server/adapters"
	handlers "it-stone-server/adapters/rest-api-handlers"
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"

	"it-stone-server/restapi/operations"
	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/user"

	"it-stone-server/models"
)

//go:generate swagger generate server --target ../../go-server --name ItStone --spec ../swagger.yml --principal models.Principal

func configureFlags(api *operations.ItStoneAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.ItStoneAPI) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	authHandler := handlers.NewAuthHandler()
	cardHandler := handlers.NewCardsHandler()
	userHandler := handlers.NewUsersHandler()

	restApiHandler := adapters.NewRestAPIHandler(authHandler, cardHandler, userHandler)
	restApiHandler.ConfigureRestAPI(api)

	//api.OauthSecurityAuth = func(token string, scopes []string) (*models.Principal, error) {
	//	return nil, errors.NotImplemented("oauth2 bearer auth (OauthSecurity) has not yet been implemented")
	//}

	if api.CallbackHandler == nil {
		api.CallbackHandler = operations.CallbackHandlerFunc(func(params operations.CallbackParams) middleware.Responder {
			return middleware.NotImplemented("operation .Callback has not yet been implemented")
		})
	}
	if api.CardCreateCardHandler == nil {
		api.CardCreateCardHandler = card.CreateCardHandlerFunc(func(params card.CreateCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation card.CreateCard has not yet been implemented")
		})
	}
	if api.CardDeleteCardHandler == nil {
		api.CardDeleteCardHandler = card.DeleteCardHandlerFunc(func(params card.DeleteCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation card.DeleteCard has not yet been implemented")
		})
	}
	if api.UserDeleteUserHandler == nil {
		api.UserDeleteUserHandler = user.DeleteUserHandlerFunc(func(params user.DeleteUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.DeleteUser has not yet been implemented")
		})
	}
	if api.CardGetCardHandler == nil {
		api.CardGetCardHandler = card.GetCardHandlerFunc(func(params card.GetCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation card.GetCard has not yet been implemented")
		})
	}
	if api.CardGetCardsHandler == nil {
		api.CardGetCardsHandler = card.GetCardsHandlerFunc(func(params card.GetCardsParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation card.GetCards has not yet been implemented")
		})
	}
	if api.UserGetUserHandler == nil {
		api.UserGetUserHandler = user.GetUserHandlerFunc(func(params user.GetUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.GetUser has not yet been implemented")
		})
	}
	if api.UserGetUsersHandler == nil {
		api.UserGetUsersHandler = user.GetUsersHandlerFunc(func(params user.GetUsersParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.GetUsers has not yet been implemented")
		})
	}
	if api.LoginLoginHandler == nil {
		api.LoginLoginHandler = login.LoginHandlerFunc(func(params login.LoginParams) middleware.Responder {
			return middleware.NotImplemented("operation login.Login has not yet been implemented")
		})
	}
	if api.CardUpdateCardHandler == nil {
		api.CardUpdateCardHandler = card.UpdateCardHandlerFunc(func(params card.UpdateCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation card.UpdateCard has not yet been implemented")
		})
	}
	if api.UserUpdateUserHandler == nil {
		api.UserUpdateUserHandler = user.UpdateUserHandlerFunc(func(params user.UpdateUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.UpdateUser has not yet been implemented")
		})
	}

	api.ServerShutdown = func() {}

	return setupGlobalMiddleware(api.Serve(setupMiddlewares))
}

// The TLS configuration before HTTPS server starts.
func configureTLS(tlsConfig *tls.Config) {
	// Make all necessary changes to the TLS configuration here.
}

// As soon as server is initialized but not run yet, this function will be called.
// If you need to modify a config, store server instance to stop it individually later, this is the place.
// This function can be called multiple times, depending on the number of serving schemes.
// scheme value will be set accordingly: "http", "https" or "unix"
func configureServer(s *http.Server, scheme, addr string) {
}

// The middleware configuration is for the handler executors. These do not apply to the swagger.json document.
// The middleware executes after routing but before authentication, binding and validation
func setupMiddlewares(handler http.Handler) http.Handler {
	return handler
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	return handler
}
