package domain

type UserToken struct {
	Token string `json:"token,omitempty"`
	User  *User  `json:"user,omitempty"`
}
