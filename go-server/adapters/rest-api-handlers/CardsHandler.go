package handlers

import (
	"github.com/go-openapi/runtime/middleware"
	"it-stone-server/adapters/converters"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/card"
	"net/http"
)

// CardsHandler interface
type CardsHandler interface {
	GetCard(params card.GetCardParams) middleware.Responder
	GetCards(params card.GetCardsParams) middleware.Responder
	InsertCards(params card.CreateCardParams) middleware.Responder
	DeleteCard(params card.DeleteCardParams) middleware.Responder
	UpdateCard(params card.UpdateCardParams) middleware.Responder
}

type cardsHandler struct {
	converter converters.CardConverter
}

// NewCardsHandler func
func NewCardsHandler() CardsHandler {
	return &cardsHandler{
		converters.NewCardConverter(),
	}
}

func (h *cardsHandler) GetCard(params card.GetCardParams) middleware.Responder {
	cardRepository := repository.NewCardRepository()
	domainCard, err := cardRepository.GetCardByField("id", params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return card.NewGetCardOK().WithPayload(h.converter.FromDomain(domainCard))
}

func (h *cardsHandler) GetCards(params card.GetCardsParams) middleware.Responder {
	cardRepository := repository.NewCardRepository()
	domainCards, err := cardRepository.GetCards()

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardsDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	var modelCards []*models.Card
	for _, model := range domainCards {
		modelCard := h.converter.FromDomain(model)
		modelCards = append(modelCards, modelCard)
	}

	return card.NewGetCardsOK().WithPayload(modelCards)
}

func (h *cardsHandler) InsertCards(params card.CreateCardParams) middleware.Responder {
	cardRepository := repository.NewCardRepository()

	id, err := cardRepository.InsertCard(h.converter.ToDomain(params.Card))

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewCreateCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return card.NewCreateCardCreated().WithPayload(&models.CreatedEntity{ID: id})
}

func (h *cardsHandler) DeleteCard(params card.DeleteCardParams) middleware.Responder {
	cardRepository := repository.NewCardRepository()
	err := cardRepository.DeleteCard(params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewDeleteCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return card.NewDeleteCardOK()
}

func (h *cardsHandler) UpdateCard(params card.UpdateCardParams) middleware.Responder {
	cardRepository := repository.NewCardRepository()
	domainCard, err := cardRepository.UpdateCard(params.ID, h.converter.ToDomain(params.Card))

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewUpdateCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}
	modelCard := h.converter.FromDomain(domainCard)
	return card.NewUpdateCardOK().WithPayload(modelCard)
}
