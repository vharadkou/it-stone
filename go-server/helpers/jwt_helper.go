package helpers

import (
	"github.com/brianvoe/sjwt"
)

const secretKey string = "6LbNC5Cm91sdf"

type JWTHelper interface {
	GenerateToken(model interface{}) string
	Verify(token string) bool
	GetUserID(token string) (*string,error)
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

func (h *jwtHelper) GetUserID(token string) (*string,error) {
	//Parse the token
	claims, err := sjwt.Parse(token)
	if err != nil {
		return nil, err
	}

	idValue, err := claims.GetStr("id") 
	if err != nil {
		return nil, err
	}
	return &idValue, err
}
