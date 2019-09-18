package helpers

import (
	"github.com/google/uuid"
)

type IDHelper interface {
	GenerateID() string
}

type idHelper struct{}

func NewIDHelper() IDHelper {
	return &idHelper{}
}

func (h *idHelper) GenerateID() string {
	return uuid.New().String()
}
