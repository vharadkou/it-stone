package converters

import (
	"it-stone-server/domain"
	"it-stone-server/models"
)

type GameConverter interface {
	FromDomain(model *domain.Game) *models.State
	ToDomain(model *models.State) *domain.Game
}

type gameConverter struct {
	playerConverter PlayerConverter
}

func NewGameConverter() GameConverter {
	return &gameConverter{
		playerConverter: NewPlayerConverter(),
	}
}

func (gc *gameConverter) ToDomain(model *models.State) *domain.Game {
	pl1 := gc.playerConverter.ToDomain(model.Player1)
	pl2 := gc.playerConverter.ToDomain(model.Player2)
	return &domain.Game{
		ID:      model.ID,
		Player1: pl1,
		Player2: pl2,
	}
}

func (gc *gameConverter) FromDomain(model *domain.Game) *models.State {
	pl1 := gc.playerConverter.FromDomain(model.Player1)
	pl2 := gc.playerConverter.FromDomain(model.Player2)
	return &models.State{
		ID:      model.ID,
		Player1: pl1,
		Player2: pl2,
	}
}
