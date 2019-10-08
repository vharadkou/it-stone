// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	"it-stone-server/adapters"
	handlers "it-stone-server/adapters/rest-api-handlers"
	"it-stone-server/domain"
	"it-stone-server/firestore"
	"it-stone-server/helpers"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations"
	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations/user"
	"it-stone-server/validation"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func configureFlags(api *operations.ItStoneAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.ItStoneAPI) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	// Set your custom logger if needed. Default one is log.Printf
	// Expected interface func(string, ...interface{})
	//
	// Example:
	api.Logger = log.Printf
	log.Printf("Service started")

	api.JSONConsumer = runtime.JSONConsumer()
	api.JSONProducer = runtime.JSONProducer()

	userRepository := repository.NewUserRepository(firestore.NewFirestoreClient)
	cardRepository := repository.NewCardRepository(firestore.NewFirestoreClient)

	userSearcher := helpers.NewUserSearchHelper()

	userValidation := validation.NewUserValidation(userRepository, userSearcher)

	authHandler := handlers.NewAuthHandler(userRepository, userSearcher, userValidation)
	cardHandler := handlers.NewCardsHandler(cardRepository)
	userHandler := handlers.NewUsersHandler(userRepository)

	restApiHandler := adapters.NewRestAPIHandler(authHandler, cardHandler, userHandler)
	restApiHandler.ConfigureRestAPI(api)

	if api.UserDeleteUserHandler == nil {
		api.UserDeleteUserHandler = user.DeleteUserHandlerFunc(func(params user.DeleteUserParams, token *models.Token) middleware.Responder {
			return middleware.NotImplemented("operation user.DeleteUser has not yet been implemented")
		})
	}

	if api.UserGetUserHandler == nil {
		api.UserGetUserHandler = user.GetUserHandlerFunc(func(params user.GetUserParams, token *models.Token) middleware.Responder {
			return middleware.NotImplemented("operation user.GetUser has not yet been implemented")
		})
	}
	if api.UserGetUsersHandler == nil {
		api.UserGetUsersHandler = user.GetUsersHandlerFunc(func(params user.GetUsersParams, token *models.Token) middleware.Responder {
			return middleware.NotImplemented("operation user.GetUsers has not yet been implemented")
		})
	}

	if api.CardUpdateCardHandler == nil {
		api.CardUpdateCardHandler = card.UpdateCardHandlerFunc(func(params card.UpdateCardParams, token *models.Token) middleware.Responder {
			return middleware.NotImplemented("operation card.UpdateCard has not yet been implemented")
		})
	}
	if api.UserUpdateUserHandler == nil {
		api.UserUpdateUserHandler = user.UpdateUserHandlerFunc(func(params user.UpdateUserParams, token *models.Token) middleware.Responder {
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
	directory := "temp"
	filename := "config.json"

	firestoreConfig := domain.NewFirestoreConfig()
	firestoreConfig.CreateConfigFile(directory, filename)

	err := os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", filepath.Join(directory, filename))
	if err != nil {
		panic(err)
	}
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
