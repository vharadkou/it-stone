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
	var outData models.Card

	outData.ID = card.ID
	outData.Class = card.Class
	outData.Damage = card.Damage
	outData.Effects = card.Effects
	outData.Hp = card.Hp
	outData.Image = card.Image
	outData.ManaCost = card.ManaCost
	outData.Name = card.Name
	outData.SurName = card.SurName
	outData.Skills = card.Skills

	return &outData
}

func (converter *cardConverter) ToDomain(card *models.Card) *domain.Card {
	var outData domain.Card

	outData.ID = card.ID
	outData.Class = card.Class
	outData.Damage = card.Damage
	outData.Effects = card.Effects
	outData.Hp = card.Hp
	outData.Image = card.Image
	outData.ManaCost = card.ManaCost
	outData.Name = card.Name
	outData.SurName = card.SurName
	outData.Skills = card.Skills

	return &outData
}
