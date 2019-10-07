package validators

import (
	"errors"
	"it-stone-server/helpers/search"
	"it-stone-server/repository"
)

type UserValidation interface {
	ValidateEmail(value string) error
	ValidateUsername(value string) error
}

type userValidation struct {
	userRepository repository.UserRepository
	userSearcher   search.UserSearcher
}

func NewUserValidation(userRepository repository.UserRepository, userSearcher search.UserSearcher) UserValidation {
	return &userValidation{
		userRepository: userRepository,
		userSearcher:   userSearcher,
	}
}

func (uv *userValidation) ValidateEmail(value string) error {
	user, _ := uv.userRepository.GetUserByField(uv.userSearcher.SearchByEmail(), value)
	if user.Email != "" {
		return errors.New("User with this email is already exists!")
	}
	return nil
}

func (uv *userValidation) ValidateUsername(value string) error {
	user, _ := uv.userRepository.GetUserByField(uv.userSearcher.SearchByUsername(), value)
	if user.UserName != "" {
		return errors.New("User with this username is already exists!")
	}
	return nil
}
