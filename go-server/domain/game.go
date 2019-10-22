package domain

type Game struct {
	ID      string  `json:"id"`
	Player1 *Player `json:"player1"`
	Player2 *Player `json:"player2"`
}
