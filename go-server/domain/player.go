package domain

type Player struct {
	ID         string `json:"id"`
	Email      string `json:"email"`
	UserName   string `json:"userName"`
	TotalGames string `json:"totalGames"`
	WinGames   string `json:"winGames"`
}
