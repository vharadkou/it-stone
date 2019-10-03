package helpers

import (
	"github.com/brianvoe/sjwt"
	"it-stone-server/domain"
	"it-stone-server/models"
	"os"
)

type JWTHelper interface {
	GenerateToken(model interface{}) *models.Token
	Verify(token string) bool
	GetDomainUserFromToken(token *models.Token) (*domain.User, error)
}

type jwtHelper struct{}

func NewJWTHelper() JWTHelper {
	return &jwtHelper{}
}

func (h *jwtHelper) GenerateToken(model interface{}) *models.Token {
	claims, _ := sjwt.ToClaims(model)
	strToken := claims.Generate([]byte(os.Getenv("jwt_secret_key")))
	return &models.Token{Token: strToken}
}

func (h *jwtHelper) Verify(token string) bool {
	return sjwt.Verify(token, []byte(os.Getenv("jwt_secret_key")))
}

func (h *jwtHelper) GetDomainUserFromToken(token *models.Token) (*domain.User, error) {
	claims, err := sjwt.Parse(token.Token)
	if err != nil {
		return nil, err
	}

	domainUser := new(domain.User)
	err = claims.ToStruct(domainUser)
	if err != nil {
		return nil, err
	}
	return domainUser, nil
}
