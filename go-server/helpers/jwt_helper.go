package helpers

import (
	"github.com/brianvoe/sjwt"
)

const secretKey string = "6LbNC5Cm91sdf"

type JWTHelper interface {
	GenerateToken(model interface{}) string
	Verify(token string) bool
}

type jwtHelper struct{}

func NewJWTHelper() JWTHelper {
	return &jwtHelper{}
}

func (h *jwtHelper) GenerateToken(model interface{}) string {
	claims, _ := sjwt.ToClaims(model)
	return claims.Generate([]byte(secretKey))
}

func (h *jwtHelper) Verify(token string) bool {
	return sjwt.Verify(token, []byte(secretKey))
}
