package domain

type UserForToken struct {
	ID         string `json:"id"`
	Email      string `json:"email"`
	UserName   string `json:"username"`
	TotalGames int64  `json:"total_games"`
	WinGames   int64  `json:"win_games"`
}
