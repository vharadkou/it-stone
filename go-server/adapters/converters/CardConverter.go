package converters

import (
	"it-stone-server/domain"
	"it-stone-server/models"
)

type CardConverter interface {
	FromDomain(card *domain.Card) *models.Card
	ToDomain(card *models.Card) *domain.Card
}

type cardConverter struct{}

func NewCardConverter() CardConverter {
	return &cardConverter{}
}

func (converter *cardConverter) FromDomain(card *domain.Card) *models.Card {
	return &models.Card{
		Class:    card.Class,
		Damage:   card.Damage,
		Effects:  card.Effects,
		Hp:       card.Hp,
		ID:       card.ID,
		Image:    card.Image,
		ManaCost: card.ManaCost,
		Name:     card.Name,
		Skills:   card.Skills,
		SurName:  card.SurName,
	}
}

func (converter *cardConverter) ToDomain(card *models.Card) *domain.Card {
	return &domain.Card{
		Class:    card.Class,
		Damage:   card.Damage,
		Effects:  card.Effects,
		Hp:       card.Hp,
		ID:       card.ID,
		Image:    card.Image,
		ManaCost: card.ManaCost,
		Name:     card.Name,
		Skills:   card.Skills,
		SurName:  card.SurName,
	}
}
