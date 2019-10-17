package domain

type Card struct {
	Class    string      `json:"class"`
	Damage   string      `json:"damage"`
	Effects  interface{} `json:"effects"`
	Hp       string      `json:"hp"`
	ID       string      `json:"id"`
	Image    string      `json:"image"`
	ManaCost string      `json:"manaCost"`
	Name     string      `json:"name"`
	Skills   []string    `json:"skills"`
	SurName  string      `json:"surName"`
}
