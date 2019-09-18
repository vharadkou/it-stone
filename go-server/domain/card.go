package domain

type Card struct {
	Class    string      `json:"class,omitempty"`
	Damage   float64     `json:"damage,omitempty"`
	Effects  interface{} `json:"effects,omitempty"`
	Hp       float64     `json:"hp,omitempty"`
	ID       string      `json:"id,omitempty"`
	Image    string      `json:"image,omitempty"`
	ManaCost float64     `json:"mana_cost,omitempty"`
	Name     string      `json:"name,omitempty"`
	Skills   []string    `json:"skills"`
	Surname  string      `json:"surname,omitempty"`
}
