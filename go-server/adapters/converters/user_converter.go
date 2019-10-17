package converters

import (
	"encoding/json"
	"it-stone-server/domain"
	"it-stone-server/models"
)

type UserConverter interface {
	FromDomain(model *domain.User) *models.User
	ToDomain(model *models.User) *domain.User
	ToUserForToken(model *domain.User) *domain.UserForToken
	ToMap(model *models.User) map[string]interface{}
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

func (uc *userConverter) ToMap(model *models.User) map[string]interface{} {
	var data map[string]interface{}
	jsonData, _ := json.Marshal(*model)
	_ = json.Unmarshal(jsonData, &data)
	return data
}
