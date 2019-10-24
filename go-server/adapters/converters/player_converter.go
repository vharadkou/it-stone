package converters

import (
	"it-stone-server/domain"
	"it-stone-server/models"
)

type PlayerConverter interface {
	FromDomain(model *domain.Player) *models.User
	ToDomain(model *models.User) *domain.Player
	FromUserToPlayer(model *domain.User) *domain.Player
}

type playerConverter struct{}

func NewPlayerConverter() PlayerConverter {
	return &playerConverter{}
}

func (uc *playerConverter) ToDomain(model *models.User) *domain.Player {
	return &domain.Player{
		ID:         model.ID,
		Email:      model.Email,
		UserName:   model.UserName,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}

func (uc *playerConverter) FromDomain(model *domain.Player) *models.User {
	return &models.User{
		ID:         model.ID,
		Email:      model.Email,
		UserName:   model.UserName,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}

func (uc *playerConverter) FromUserToPlayer(model *domain.User) *domain.Player {
	return &domain.Player{
		ID:         model.ID,
		Email:      model.Email,
		UserName:   model.UserName,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}
