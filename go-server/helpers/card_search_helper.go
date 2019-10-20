package helpers

type CardSearchHelper interface {
	SearchByID() string
}

type cardSearchHelper struct{}

func NewCardSearchHelper() CardSearchHelper {
	return &cardSearchHelper{}
}

func (us cardSearchHelper) SearchByID() string {
	return "id"
}
