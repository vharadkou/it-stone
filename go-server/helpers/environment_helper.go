package helpers

import "os"

type EnvironmentHelper interface {
	DirExists(directoryPath string) bool
	FileExists(filePath string) bool
	CreateDirectory(directoryPath string) error
}

type environmentHelper struct{}

func NewEnvHelper() EnvironmentHelper {
	return &environmentHelper{}
}

func (h *environmentHelper) DirExists(directoryPath string) bool {
	info, err := os.Stat(directoryPath)
	if os.IsNotExist(err) {
		return false
	}
	return info.IsDir()
}

func (h *environmentHelper) FileExists(filePath string) bool {
	info, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		return false
	}
	return !info.IsDir()
}

func (h *environmentHelper) CreateDirectory(directoryPath string) error {
	if !h.DirExists(directoryPath) {
		return os.Mkdir(directoryPath, os.ModePerm)
	}
	return nil
}
