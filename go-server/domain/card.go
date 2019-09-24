package domain

type Card struct {
	Class    string      `json:"class"`
	Damage   float64     `json:"damage"`
	Effects  interface{} `json:"effects"`
	Hp       float64     `json:"hp"`
	ID       string      `json:"id"`
	Image    string      `json:"image"`
	ManaCost float64     `json:"mana_cost"`
	Name     string      `json:"name"`
	Skills   []string    `json:"skills"`
	Surname  string      `json:"surname"`
}
