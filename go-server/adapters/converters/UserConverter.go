package converters

import (
	"it-stone-server/domain"
	"it-stone-server/models"
)

type UserConverter interface {
	FromDomain(model *domain.User) *models.User
	ToDomain(model *models.User) *domain.User
	ToOut(model *domain.User) *domain.OutUser
}

type userConverter struct{}

func NewUserConverter() UserConverter {
	return &userConverter{}
}

func (uc *userConverter) ToDomain(model *models.User) *domain.User {
	return &domain.User{
		ID:         model.ID,
		Email:      model.Email,
		Password:   model.Password,
		Username:   model.Username,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}

func (uc *userConverter) FromDomain(model *domain.User) *models.User {
	return &models.User{
		ID:         model.ID,
		Email:      model.Email,
		Password:   model.Password,
		Username:   model.Username,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}

func (uc *userConverter) ToOut(model *domain.User) *domain.OutUser {
	return &domain.OutUser{
		ID:         model.ID,
		Email:      model.Email,
		Username:   model.Username,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}
