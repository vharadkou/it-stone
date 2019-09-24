package converters

import (
	"it-stone-server/domain"
	"it-stone-server/models"
)

type UserTokenConverter interface {
	FromDomain(model *domain.UserToken) *models.UserToken
	ToDomain(model *models.UserToken) *domain.UserToken
}

type userTokenConverter struct {
	uc UserConverter
}

func NewUserTokenConverter() UserTokenConverter {
	return &userTokenConverter{
		uc: NewUserConverter(),
	}
}

func (utc *userTokenConverter) FromDomain(model *domain.UserToken) *models.UserToken {
	return &models.UserToken{
		Token: model.Token,
		User:  utc.uc.FromDomain(model.User),
	}
}

func (utc *userTokenConverter) ToDomain(model *models.UserToken) *domain.UserToken {
	return &domain.UserToken{
		Token: model.Token,
		User:  utc.uc.ToDomain(model.User),
	}
}
