package domain

type User struct {
	ID         string
	Email      string
	UserName   string
	Password   string
	TotalGames int64
	WinGames   int64
}

func NewDomainUser(email, username, password string) *User {
	return &User{
		Email:      email,
		UserName:   username,
		Password:   password,
		TotalGames: 0,
		WinGames:   0,
	}
}
