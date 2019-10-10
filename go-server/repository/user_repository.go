package repository

import (
	"context"
	"encoding/json"
	"it-stone-server/domain"
	"it-stone-server/firestore"
	"it-stone-server/helpers"
	"log"
	"os"
)

type UserRepository interface {
	GetUserByField(ctx context.Context, field, value string) (*domain.User, error)
	GetUsers(ctx context.Context) ([]*domain.User, error)
	InsertUser(ctx context.Context, user *domain.User) error
	DeleteUser(ctx context.Context, id string) error
	UpdateUser(ctx context.Context, id string, User *domain.User) (*domain.User, error)
}

type userRepository struct {
	collection string
	idHelper   helpers.IDHelper
	clientFunc firestore.FirestoreClientFunc
}

func NewUserRepository(clientFunc firestore.FirestoreClientFunc) UserRepository {
	return &userRepository{
		collection: "Users",
		idHelper:   helpers.NewIDHelper(),
		clientFunc: clientFunc,
	}
}

func (r *userRepository) GetUserByField(ctx context.Context, field, value string) (*domain.User, error) {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer db.Close()

	recordTmpMap, err := db.FindOneByField(r.collection, field, value)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var user domain.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &user)
	return &user, nil
}

func (r *userRepository) GetUsers(ctx context.Context) ([]*domain.User, error) {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer db.Close()

	recordTmpMap, err := db.FindAll(r.collection)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var Users []*domain.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &Users)
	return Users, nil
}

func (r *userRepository) InsertUser(ctx context.Context, user *domain.User) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	user.ID = r.idHelper.GenerateID()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(user)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(r.collection, user.ID, data)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (r *userRepository) DeleteUser(ctx context.Context, id string) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	return db.DeleteOneByID(r.collection, id)
}

func (r *userRepository) UpdateUser(ctx context.Context, id string, domainUser *domain.User) (*domain.User, error) {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer db.Close()

	domainUser.ID = id

	var data map[string]interface{}
	jsonData, _ := json.Marshal(*domainUser)
	_ = json.Unmarshal(jsonData, &data)

	recordTmpMap, err := db.UpdateOneByID(r.collection, domainUser.ID, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	user := new(domain.User)
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, user)
	return user, nil
}
