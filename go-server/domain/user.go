package domain

import "github.com/go-openapi/strfmt"

type User struct {
	ID         string          `json:"id,omitempty"`
	Email      strfmt.Email    `json:"email,omitempty"`
	Username   string          `json:"username"`
	Password   strfmt.Password `json:"password,omitempty"`
	TotalGames int64           `json:"total_games"`
	WinGames   int64           `json:"win_games"`
}
