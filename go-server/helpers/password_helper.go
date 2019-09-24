package helpers

import (
	"golang.org/x/crypto/bcrypt"
)

type PasswordHelper interface {
	Compare(externalPass, internalPass string) error
	GenerateHashPassword(externalPass string) (*string, error)
}

type passwordHelper struct{}

func NewPasswordHelper() PasswordHelper {
	return &passwordHelper{}
}

func (h *passwordHelper) Compare(externalPass, internalPass string) error {
	return bcrypt.CompareHashAndPassword([]byte(internalPass), []byte(externalPass))
}

func (h *passwordHelper) GenerateHashPassword(externalPass string) (*string, error) {
	sbExternalPassword := []byte(externalPass)
	hashedPassword, err := bcrypt.GenerateFromPassword(sbExternalPassword, bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	internalPassword := string(hashedPassword)
	return &internalPassword, nil
}
