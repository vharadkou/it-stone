package adapters

import (
	"github.com/go-openapi/runtime/middleware"
	handlers "it-stone-server/adapters/rest-api-handlers"
	"it-stone-server/models"
	"it-stone-server/restapi/operations"
	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/registration"
	"it-stone-server/restapi/operations/user"
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

func (restApi *RestAPIHandlers) ConfigureRestAPI(api *operations.ItStoneAPI) {

	api.APIKeyHeaderAuth = func(token string) (*models.Token, error) {
		return restApi.authHandler.APIKeyHeaderAuth(token)
	}
	api.RegistrationRegistrationHandler = registration.RegistrationHandlerFunc(func(params registration.RegistrationParams) middleware.Responder {
		return restApi.authHandler.Registration(params)
	})
	api.LoginLoginHandler = login.LoginHandlerFunc(func(params login.LoginParams) middleware.Responder {
		return restApi.authHandler.Login(params)
	})

	api.CardGetCardHandler = card.GetCardHandlerFunc(func(params card.GetCardParams, token *models.Token) middleware.Responder {
		return restApi.cardsHandler.GetCard(params)
	})
	api.CardGetCardsHandler = card.GetCardsHandlerFunc(func(params card.GetCardsParams, token *models.Token) middleware.Responder {
		return restApi.cardsHandler.GetCards(params)
	})
	api.CardCreateCardHandler = card.CreateCardHandlerFunc(func(params card.CreateCardParams, token *models.Token) middleware.Responder {
		return restApi.cardsHandler.InsertCard(params)
	})
	api.CardDeleteCardHandler = card.DeleteCardHandlerFunc(func(params card.DeleteCardParams, token *models.Token) middleware.Responder {
		return restApi.cardsHandler.DeleteCard(params)
	})
	api.CardUpdateCardHandler = card.UpdateCardHandlerFunc(func(params card.UpdateCardParams, token *models.Token) middleware.Responder {
		return restApi.cardsHandler.UpdateCard(params)
	})

	api.UserGetUserHandler = user.GetUserHandlerFunc(func(params user.GetUserParams, token *models.Token) middleware.Responder {
		return restApi.usersHandler.GetUser(params)
	})
	api.UserUpdateUserHandler = user.UpdateUserHandlerFunc(func(params user.UpdateUserParams, token *models.Token) middleware.Responder {
		return restApi.usersHandler.UpdateUser(params)
	})
	api.UserDeleteUserHandler = user.DeleteUserHandlerFunc(func(params user.DeleteUserParams, token *models.Token) middleware.Responder {
		return restApi.usersHandler.DeleteUser(params)
	})
	api.UserGetUserByTokenHandler = user.GetUserByTokenHandlerFunc(func(params user.GetUserByTokenParams, token *models.Token) middleware.Responder {
		return restApi.usersHandler.GetUserByToken(token)
	})

}
