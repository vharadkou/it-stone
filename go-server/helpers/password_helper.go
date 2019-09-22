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
	sbExternalPassword := []byte(externalPass)
	sbInternalPassword := []byte(internalPass)
	hashedPassword, err := bcrypt.GenerateFromPassword(sbExternalPassword, bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	return bcrypt.CompareHashAndPassword(hashedPassword, sbInternalPassword)
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
