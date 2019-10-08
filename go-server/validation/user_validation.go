package validation

import (
	"context"
	"errors"
	"it-stone-server/helpers"
	"it-stone-server/repository"
)

type UserValidation interface {
	ValidateEmail(ctx context.Context, value string) error
	ValidateUsername(ctx context.Context, value string) error
}

type userValidation struct {
	userRepository repository.UserRepository
	userSearcher   helpers.UserSearchHelper
}

func NewUserValidation(userRepository repository.UserRepository, userSearcher helpers.UserSearchHelper) UserValidation {
	return &userValidation{
		userRepository: userRepository,
		userSearcher:   userSearcher,
	}
}

func (uv *userValidation) ValidateEmail(ctx context.Context, value string) error {
	user, _ := uv.userRepository.GetUserByField(ctx, uv.userSearcher.SearchByEmail(), value)
	if user.Email != "" {
		return errors.New("User with this email is already exists!")
	}
	return nil
}

func (uv *userValidation) ValidateUsername(ctx context.Context, value string) error {
	user, _ := uv.userRepository.GetUserByField(ctx, uv.userSearcher.SearchByUsername(), value)
	if user.UserName != "" {
		return errors.New("User with this username is already exists!")
	}
	return nil
}
