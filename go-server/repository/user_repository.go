package repository

import (
	"context"
	"encoding/json"
	"it-stone-server/domain"
	"it-stone-server/helpers"
	"log"
	"time"
)

type UserRepository interface {
	getDbClient() (DbWorker, error)
	GetUserByField(field, value string) (*domain.User, error)
	GetUsers() ([]*domain.User, error)
	InsertUser(user *domain.User) error
	DeleteUser(id string) error
	UpdateUser(id string, User *domain.User) (*domain.User, error)
}

type userRepository struct {
	collection string
}

func NewUserRepository() UserRepository {
	return &userRepository{"Users"}
}

func (cw *userRepository) GetUserByField(field, value string) (*domain.User, error) {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer func() {
		_ = db.Close()
	}()

	recordTmpMap, err := db.FindOneByField(cw.collection, field, value)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	user := new(domain.User)
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, user)
	return user, nil
}

func (cw *userRepository) GetUsers() ([]*domain.User, error) {
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

	var Users []*domain.User
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

	user.ID = helpers.IDHelper.GenerateID(helpers.NewIDHelper())

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

func (cw *userRepository) UpdateUser(id string, domainUser *domain.User) (*domain.User, error) {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer func() {
		_ = db.Close()
	}()

	domainUser.ID = id

	var data map[string]interface{}
	jsonData, _ := json.Marshal(*domainUser)
	_ = json.Unmarshal(jsonData, &data)

	recordTmpMap, err := db.UpdateOneByID(cw.collection, domainUser.ID, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	user := new(domain.User)
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, user)
	return user, nil
}

func (cw *userRepository) getDbClient() (DbWorker, error) {
	ctx, cancelFunc := context.WithTimeout(context.Background(), 10*time.Second)
	return NewDbClient(ctx, cancelFunc)
}
