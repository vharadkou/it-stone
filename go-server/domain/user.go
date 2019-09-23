package domain

type User struct {
	ID         string `json:"id,omitempty"`
	Email      string `json:"email,omitempty"`
	Username   string `json:"username"`
	Password   string `json:"password,omitempty"`
	TotalGames int64  `json:"total_games"`
	WinGames   int64  `json:"win_games"`
}

func NewDomainUser(email, username, password string) *User {
	return &User{
		Email:      email,
		Username:   username,
		Password:   password,
		TotalGames: 0,
		WinGames:   0,
	}
}
