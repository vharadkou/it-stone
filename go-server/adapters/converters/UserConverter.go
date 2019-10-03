package converters

import (
	"it-stone-server/domain"
	"it-stone-server/models"
)

type UserConverter interface {
	FromDomain(model *domain.User) *models.User
	ToDomain(model *models.User) *domain.User
	ToUserForToken(model *domain.User) *domain.UserForToken
}

type userConverter struct{}

func NewUserConverter() UserConverter {
	return &userConverter{}
}

func (uc *userConverter) ToDomain(model *models.User) *domain.User {
	return &domain.User{
		ID:         model.ID,
		Email:      model.Email,
		UserName:   model.UserName,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}

func (uc *userConverter) FromDomain(model *domain.User) *models.User {
	return &models.User{
		ID:         model.ID,
		Email:      model.Email,
		UserName:   model.UserName,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}

func (uc *userConverter) ToUserForToken(model *domain.User) *domain.UserForToken {
	return &domain.UserForToken{
		ID:         model.ID,
		Email:      model.Email,
		UserName:   model.UserName,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}
