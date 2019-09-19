package domain

type UserToken struct {
	Token string `json:"token,omitempty"`
	User  *User  `json:"user,omitempty"`
}

func NewUserToken(token string, user *User) *UserToken {
	return &UserToken{
		Token: token,
		User:  user,
	}
}
