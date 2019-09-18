package repository

import (
	"context"
	"encoding/json"
	"it-stone-server/models"
	"log"
	"os"

	"google.golang.org/api/option"
)

type UserWorker interface {
	getDbClient() (DbWorker, error)
	GetUser(id string) (*models.User, error)
	GetUsers() ([]*models.User, error)
	InsertUser(user *models.User) error
	DeleteUser(id string) error
	UpdateUser(id string, User *models.User) (*models.User, error)
}

type UserRepository struct {
	collection string
}

func NewUserRepository() UserWorker {
	return &UserRepository{
		"Users",
	}
}

func (cw *UserRepository) GetUser(id string) (*models.User, error) {
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

func (cw *UserRepository) GetUsers() ([]*models.User, error) {
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

func (cw *UserRepository) InsertUser(user *models.User) error {
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

	err = db.InsertOne(cw.collection, user.UserID, data)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (cw *UserRepository) DeleteUser(id string) error {
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

func (cw *UserRepository) UpdateUser(id string, userUp *models.User) (*models.User, error) {
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

	recordTmpMap, err := db.UpdateOneByID(cw.collection, userUp.UserID, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var User models.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &User)
	return &User, nil
}

func (cw *UserRepository) getDbClient() (DbWorker, error) {
	dir, _ := os.Getwd()
	ctx := context.Background()
	co := option.WithCredentialsFile(dir + ConfigDbPath)
	return NewDbClient(ctx, co)
}
