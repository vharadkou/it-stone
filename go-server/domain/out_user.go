package domain

import "github.com/go-openapi/strfmt"

type OutUser struct {
	ID         string       `json:"id"`
	Email      strfmt.Email `json:"email"`
	Username   string       `json:"username"`
	TotalGames int64        `json:"total_games"`
	WinGames   int64        `json:"win_games"`
}