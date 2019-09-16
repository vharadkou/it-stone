package adapters

import (
	handlers "it-stone-server/adapters/rest-api-handlers"
	"it-stone-server/restapi/operations"
	"it-stone-server/restapi/operations/card"

	"github.com/go-openapi/runtime/middleware"
)

// RestAPIHandlers struct
type RestAPIHandlers struct {
	cardsHandler handlers.CardsHandler
}

// NewRestAPIHandler func
func NewRestAPIHandler(cardsHandler handlers.CardsHandler) RestAPIHandlers {
	return RestAPIHandlers{
		cardsHandler: cardsHandler,
	}
}

// ConfigureRestAPI func
func (restApi *RestAPIHandlers) ConfigureRestAPI(api *operations.ItStoneAPI) {

	api.CardGetCardHandler = card.GetCardHandlerFunc(func(params card.GetCardParams) middleware.Responder {
		return restApi.cardsHandler.GetCard(params)
	})

	api.CardGetCardsHandler = card.GetCardsHandlerFunc(func(params card.GetCardsParams) middleware.Responder {
		return restApi.cardsHandler.GetCards(params)
	})

	api.CardCreateCardHandler = card.CreateCardHandlerFunc(func(params card.CreateCardParams) middleware.Responder {
		return restApi.cardsHandler.InsertCards(params)
	})

	api.CardDeleteCardHandler = card.DeleteCardHandlerFunc(func(params card.DeleteCardParams) middleware.Responder {
		return restApi.cardsHandler.DeleteCard(params)
	})

	api.CardUpdateCardHandler = card.UpdateCardHandlerFunc(func(params card.UpdateCardParams) middleware.Responder {
		return restApi.cardsHandler.UpdateCard(params)
	})
}
