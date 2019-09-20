package adapters

import (
	handlers "it-stone-server/adapters/rest-api-handlers"
	"it-stone-server/models"
	"it-stone-server/restapi/operations"
	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/registration"
	"it-stone-server/restapi/operations/user"

	"github.com/go-openapi/runtime/middleware"
)

type RestAPIHandlers struct {
	authHandler  handlers.AuthHandler
	cardsHandler handlers.CardsHandler
	usersHandler handlers.UsersHandler
}

func NewRestAPIHandler(authHandler handlers.AuthHandler, cardsHandler handlers.CardsHandler, usersHandler handlers.UsersHandler) RestAPIHandlers {
	return RestAPIHandlers{
		authHandler:  authHandler,
		cardsHandler: cardsHandler,
		usersHandler: usersHandler,
	}
}

// ConfigureRestAPI func
func (restApi *RestAPIHandlers) ConfigureRestAPI(api *operations.ItStoneAPI) {

	api.APIKeyHeaderAuth = func(token string) (*models.Principal, error) {
		return restApi.authHandler.APIKeyHeaderAuth(token)
	}
	api.RegistrationRegistrationHandler = registration.RegistrationHandlerFunc(func(params registration.RegistrationParams) middleware.Responder {
		return restApi.authHandler.Registration(params)
	})
	api.LoginLoginHandler = login.LoginHandlerFunc(func(params login.LoginParams) middleware.Responder {
		return restApi.authHandler.Login(params)
	})

	api.CardGetCardHandler = card.GetCardHandlerFunc(func(params card.GetCardParams, principal *models.Principal) middleware.Responder {
		return restApi.cardsHandler.GetCard(params)
	})
	api.CardGetCardsHandler = card.GetCardsHandlerFunc(func(params card.GetCardsParams, principal *models.Principal) middleware.Responder {
		return restApi.cardsHandler.GetCards(params)
	})
	api.CardCreateCardHandler = card.CreateCardHandlerFunc(func(params card.CreateCardParams, principal *models.Principal) middleware.Responder {
		return restApi.cardsHandler.InsertCards(params)
	})
	api.CardDeleteCardHandler = card.DeleteCardHandlerFunc(func(params card.DeleteCardParams, principal *models.Principal) middleware.Responder {
		return restApi.cardsHandler.DeleteCard(params)
	})
	api.CardUpdateCardHandler = card.UpdateCardHandlerFunc(func(params card.UpdateCardParams, principal *models.Principal) middleware.Responder {
		return restApi.cardsHandler.UpdateCard(params)
	})

	api.UserGetUserHandler = user.GetUserHandlerFunc(func(params user.GetUserParams, principal *models.Principal) middleware.Responder {
		return restApi.usersHandler.GetUser(params)
	})
}
