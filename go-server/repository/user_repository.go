package repository

import (
	"context"
	"encoding/json"
	"it-stone-server/domain"
	"it-stone-server/models"
	"log"
	"os"

	"google.golang.org/api/option"
)

type UserWorker interface {
	getDbClient() (DbWorker, error)
	GetUser(id string) (*models.User, error)
	GetUsers() ([]*models.User, error)
	InsertUser(user *domain.User) error
	DeleteUser(id string) error
	UpdateUser(id string, User *models.User) (*models.User, error)
}

type userRepository struct {
	collection string
}

func NewUserRepository() UserWorker {
	return &userRepository{
		"Users",
	}
}

func (cw *userRepository) GetUser(id string) (*models.User, error) {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer func() {
		_ = db.Close()
	}()

	recordTmpMap, err := db.FindOneByID(cw.collection, id)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var User models.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &User)
	return &User, nil
}

func (cw *userRepository) GetUsers() ([]*models.User, error) {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer func() {
		_ = db.Close()
	}()

	recordTmpMap, err := db.FindAll(cw.collection)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var Users []*models.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &Users)
	return Users, nil
}

func (cw *userRepository) InsertUser(user *domain.User) error {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return err
	}

	defer func() {
		_ = db.Close()
	}()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(user)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(cw.collection, user.ID, data)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (cw *userRepository) DeleteUser(id string) error {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return err
	}

	defer func() {
		_ = db.Close()
	}()

	return db.DeleteOneByID(cw.collection, id)
}

func (cw *userRepository) UpdateUser(id string, userUp *models.User) (*models.User, error) {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer func() {
		_ = db.Close()
	}()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(*userUp)
	_ = json.Unmarshal(jsonData, &data)

	recordTmpMap, err := db.UpdateOneByID(cw.collection, userUp.ID, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var User models.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &User)
	return &User, nil
}

func (cw *userRepository) getDbClient() (DbWorker, error) {
	dir, _ := os.Getwd()
	ctx := context.Background()
	co := option.WithCredentialsFile(dir + ConfigDbPath)
	return NewDbClient(ctx, co)
}
