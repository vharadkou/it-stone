package firestore

import (
	"encoding/json"
	"io/ioutil"
	"it-stone-server/domain"
	"it-stone-server/helpers"
	"log"
	"path/filepath"
	"strings"
)

type FirestoreConfigCreator interface {
	CreateConfigFile(directory, filename string) error
}

type firestoreConfigCreator struct {
	FirestoreConfig *domain.FirestoreConfig
	EnvHelper       helpers.EnvironmentHelper
}

func NewFirestoreConfigCreator(firestoreConfig *domain.FirestoreConfig, envHelper helpers.EnvironmentHelper) FirestoreConfigCreator {
	return &firestoreConfigCreator{
		FirestoreConfig: firestoreConfig,
		EnvHelper:       envHelper,
	}
}

func (f *firestoreConfigCreator) CreateConfigFile(directory, filename string) error {
	fullPath := filepath.Join(directory, filename)

	err := f.EnvHelper.CreateDirectory(directory)

	if err != nil {
		log.Println("Error creating temp directory")
		return err
	}

	if f.EnvHelper.FileExists(fullPath) {
		return nil
	}

	file, err := json.MarshalIndent(f.FirestoreConfig, "", " ")
	if err != nil {
		log.Println("Error marshaling firestore config struct")
		return err
	}

	str := strings.Replace(string(file), "\\n", "n", -1)

	err = ioutil.WriteFile(fullPath, []byte(str), 0644)
	if err != nil {
		log.Println("Error writing a file")
		return err
	}

	return nil
}
