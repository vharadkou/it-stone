package handlers

import (
	"it-stone/models"
	"it-stone/restapi/operations/card"

	"github.com/go-openapi/runtime/middleware"
)

// CardsHandler interface
type CardsHandler interface {
	GetCards(params card.GetCardsParams) middleware.Responder
}

type cardsHandler struct {
}

// NewCardsHandler func
func NewCardsHandler() CardsHandler {
	return &cardsHandler{}
}

func (h *cardsHandler) GetCards(params card.GetCardsParams) middleware.Responder {

	nameOne := "NameOne"
	classOne := "ClassOne"
	skillOne := []string{"SkillOne"}

	nameTwo := "NameTwo"
	classTwo := "ClassTwo"
	skillTwo := []string{"SkillTwo"}
	var cards []*models.Card

	uOne := models.Card{
		Name:   &nameOne,
		Class:  &classOne,
		Skills: skillOne,
	}

	uTwo := models.Card{
		Name:   &nameTwo,
		Class:  &classTwo,
		Skills: skillTwo,
	}

	cards = append(cards, &uOne, &uTwo)

	return card.NewGetCardsOK().WithPayload(cards)
}
