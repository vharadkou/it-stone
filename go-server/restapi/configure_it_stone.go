// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"it-stone-server/adapters"
	handlers "it-stone-server/adapters/rest-api-handlers"
	"net/http"
	"it-stone-server/models"
	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/runtime"
	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations"
)

//go:generate swagger generate server --target ..\..\it-stone-server-server --name ItStone --spec ..\swagger.yml

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
	// api.Logger = log.Printf

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	cardHandler := handlers.NewCardsHandler()
	restApiHandler := adapters.NewRestAPIHandler(cardHandler)
	restApiHandler.ConfigureRestAPI(api)
	
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
