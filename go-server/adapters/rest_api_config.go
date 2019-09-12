package adapters

import (
	handlers "it-stone/adapters/rest-api-handlers"
	"it-stone/restapi/operations"
	"it-stone/restapi/operations/card"

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
}
