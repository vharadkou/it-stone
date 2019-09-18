package adapters

import (
	handlers "it-stone-server/adapters/rest-api-handlers"
	"it-stone-server/models"
	"it-stone-server/restapi/operations"
	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations/user"

	"github.com/go-openapi/runtime/middleware"
)

// RestAPIHandlers struct
type RestAPIHandlers struct {
	cardsHandler handlers.CardsHandler
	usershandler handlers.UsersHandler
}

// NewRestAPIHandler func
func NewRestAPIHandler(cardsHandler handlers.CardsHandler) RestAPIHandlers {
	return RestAPIHandlers{
		cardsHandler: cardsHandler,
		usershandler: handlers.NewUsersHandler(),
	}
}

// ConfigureRestAPI func
func (restApi *RestAPIHandlers) ConfigureRestAPI(api *operations.ItStoneAPI) {

	api.OauthSecurityAuth = func(token string, scopes []string) (*models.Principal, error) {
		return restApi.usershandler.OAuthSecurity(token)
	}
	
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

	api.GetV0AuthCallbackHandler = operations.GetV0AuthCallbackHandlerFunc(func(params operations.GetV0AuthCallbackParams) middleware.Responder {
		usToken, err := restApi.usershandler.CallbackUserAndToken(params.HTTPRequest)
		if err != nil {
			return middleware.NotImplemented("Some errors in the callback")
		}
		return operations.NewGetV0AuthCallbackOK().WithPayload(usToken)
	})

	api.UserGetV0LoginHandler = user.GetV0LoginHandlerFunc(func(params user.GetV0LoginParams) middleware.Responder {
		return restApi.usershandler.LoginUser(params.HTTPRequest)
	})

	if api.UserDeleteV0UsersUserIDHandler == nil {
		api.UserDeleteV0UsersUserIDHandler = user.DeleteV0UsersUserIDHandlerFunc(func(params user.DeleteV0UsersUserIDParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.DeleteV0UsersUserID has not yet been implemented")
		})
	}

	api.UserGetV0UsersUserIDHandler = user.GetV0UsersUserIDHandlerFunc(func(params user.GetV0UsersUserIDParams, principal *models.Principal) middleware.Responder {
		return restApi.usershandler.GetUser(params)
	})

	if api.UserPutV0UsersUserIDHandler == nil {
		api.UserPutV0UsersUserIDHandler = user.PutV0UsersUserIDHandlerFunc(func(params user.PutV0UsersUserIDParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.PutV0UsersUserID has not yet been implemented")
		})
	}

}
