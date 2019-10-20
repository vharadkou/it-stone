package converters

import (
	"encoding/json"
	"it-stone-server/domain"
	"it-stone-server/models"
)

type CardConverter interface {
	FromDomain(card *domain.Card) *models.Card
	ToDomain(card *models.Card) *domain.Card
	ToMap(model *models.Card) map[string]interface{}
}

type cardConverter struct{}

func NewCardConverter() CardConverter {
	return &cardConverter{}
}

func (converter *cardConverter) FromDomain(model *domain.Card) *models.Card {
	return &models.Card{
		Class:    model.Class,
		Damage:   model.Damage,
		Effects:  model.Effects,
		Hp:       model.Hp,
		ID:       model.ID,
		Image:    model.Image,
		ManaCost: model.ManaCost,
		Name:     model.Name,
		Skills:   model.Skills,
		SurName:  model.SurName,
	}
}

func (converter *cardConverter) ToDomain(model *models.Card) *domain.Card {
	return &domain.Card{
		Class:    model.Class,
		Damage:   model.Damage,
		Effects:  model.Effects,
		Hp:       model.Hp,
		ID:       model.ID,
		Image:    model.Image,
		ManaCost: model.ManaCost,
		Name:     model.Name,
		Skills:   model.Skills,
		SurName:  model.SurName,
	}
}

func (converter *cardConverter) ToMap(model *models.Card) map[string]interface{} {
	var data map[string]interface{}
	jsonData, _ := json.Marshal(*model)
	_ = json.Unmarshal(jsonData, &data)
	return data
}
