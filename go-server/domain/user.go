package domain

type User struct {
	ID         string `json:"userID,omitempty"`
	Email      string `json:"email,omitempty"`
	Username   string `json:"userName,omitempty"`
	FirstName  string `json:"firstName,omitempty"`
	LastName   string `json:"lastName,omitempty"`
	TotalGames int64  `json:"totalGames"`
	WinGames   int64  `json:"winGames"`
}

func NewUser(googleUser *GoogleUser) *User {
	return &User{
		ID:         googleUser.Sub,
		Email:      googleUser.Email,
		Username:   googleUser.Name,
		FirstName:  googleUser.GivenName,
		LastName:   googleUser.FamilyName,
		TotalGames: 0,
		WinGames:   0,
	}
}
