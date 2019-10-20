package domain

type User struct {
	ID         string `json:"id"`
	Email      string `json:"email"`
	UserName   string `json:"userName"`
	Password   string `json:"password"`
	TotalGames string `json:"totalGames"`
	WinGames   string `json:"winGames"`
}

func NewDomainUser(email, username, password string) *User {
	return &User{
		Email:      email,
		UserName:   username,
		Password:   password,
		TotalGames: "0",
		WinGames:   "0",
	}
}
