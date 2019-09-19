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
		Email:      model.Email,
		FirstName:  model.FirstName,
		LastName:   model.LastName,
		TotalGames: model.TotalGames,
		UserID:     model.ID,
		UserName:   model.Username,
		WinGames:   model.WinGames,
	}
}

func (uc *userConverter) ToDomain(model *models.User) *domain.User {
	return &domain.User{
		ID:         model.UserID,
		Email:      model.Email,
		Username:   model.UserName,
		FirstName:  model.FirstName,
		LastName:   model.LastName,
		TotalGames: model.TotalGames,
		WinGames:   model.WinGames,
	}
}
