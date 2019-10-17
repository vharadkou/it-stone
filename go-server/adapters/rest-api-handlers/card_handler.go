package handlers

import (
	"github.com/go-openapi/runtime/middleware"
	"it-stone-server/adapters/converters"
	"it-stone-server/helpers"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/card"
	"net/http"
)

// CardsHandler interface
type CardsHandler interface {
	GetCard(params card.GetCardParams) middleware.Responder
	GetCards(params card.GetCardsParams) middleware.Responder
	InsertCard(params card.CreateCardParams) middleware.Responder
	DeleteCard(params card.DeleteCardParams) middleware.Responder
	UpdateCard(params card.UpdateCardParams) middleware.Responder
}

type cardsHandler struct {
	cardRepository repository.CardRepository
	cardConverter  converters.CardConverter
	cardSearcher   helpers.CardSearchHelper
}

// NewCardsHandler func
func NewCardsHandler(cardRepository repository.CardRepository, cardSearcher helpers.CardSearchHelper) CardsHandler {
	return &cardsHandler{
		cardRepository: cardRepository,
		cardSearcher:   cardSearcher,
		cardConverter:  converters.NewCardConverter(),
	}
}

func (h *cardsHandler) GetCard(params card.GetCardParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	domainCard, err := h.cardRepository.GetCardByField(ctx, h.cardSearcher.SearchByID(), params.ID)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	return card.NewGetCardOK().WithPayload(h.cardConverter.FromDomain(domainCard))
}

func (h *cardsHandler) GetCards(params card.GetCardsParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	domainCards, err := h.cardRepository.GetCards(ctx)

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardsDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	var modelCards []*models.Card
	for _, model := range domainCards {
		modelCard := h.cardConverter.FromDomain(model)
		modelCards = append(modelCards, modelCard)
	}

	return card.NewGetCardsOK().WithPayload(modelCards)
}

func (h *cardsHandler) InsertCard(params card.CreateCardParams) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	id, err := h.cardRepository.InsertCard(ctx, h.cardConverter.ToDomain(params.Card))

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
	ctx := params.HTTPRequest.Context()
	err := h.cardRepository.DeleteCard(ctx, params.ID)

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
	ctx := params.HTTPRequest.Context()
	domainCard, err := h.cardRepository.UpdateCard(ctx, params.ID, h.cardConverter.ToMap(params.Card))

	if err != nil {
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewUpdateCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}
	modelCard := h.cardConverter.FromDomain(domainCard)
	return card.NewUpdateCardOK().WithPayload(modelCard)
}
