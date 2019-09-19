package domain

import "github.com/go-openapi/strfmt"

type User struct {
	Email      strfmt.Email    `json:"email,omitempty"`
	ID         string          `json:"id,omitempty"`
	Password   strfmt.Password `json:"password,omitempty"`
	TotalGames int64           `json:"total_games,omitempty"`
	Username   string          `json:"username"`
	WinGames   int64           `json:"win_games"`
}
