package converters

import (
	"it-stone-server/domain"
	"it-stone-server/models"
)

type UserConverter interface {
	FromDomain(model *domain.User) *models.User
	ToDomain(model *models.User) *domain.User
}

type userConverter struct{}

func NewUserConverter() UserConverter {
	return &userConverter{}
}

func (uc *userConverter) FromDomain(model *domain.User) *models.User {
	return &models.User{
		ID:         model.ID,
		Email:      model.Email,
		Username:   model.Username,
		Password:   model.Password,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}

func (uc *userConverter) ToDomain(model *models.User) *domain.User {
	return &domain.User{
		ID:         model.ID,
		Email:      model.Email,
		Username:   model.Username,
		Password:   model.Password,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}
