package helpers

import (
	"github.com/brianvoe/sjwt"
	"it-stone-server/domain"
	"os"
)

type JWTHelper interface {
	GenerateToken(model interface{}) string
	Verify(token string) bool
	GetDomainUserFromToken(token string) (*domain.User, error)
}

type jwtHelper struct{}

func NewJWTHelper() JWTHelper {
	return &jwtHelper{}
}

func (h *jwtHelper) GenerateToken(model interface{}) string {
	claims, _ := sjwt.ToClaims(model)
	return claims.Generate([]byte(os.Getenv("JWT_SECRET_KEY")))
}

func (h *jwtHelper) Verify(token string) bool {
	return sjwt.Verify(token, []byte(os.Getenv("JWT_SECRET_KEY")))
}

func (h *jwtHelper) GetDomainUserFromToken(token string) (*domain.User, error) {
	claims, err := sjwt.Parse(token)
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
