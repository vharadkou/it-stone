package repository

import (
	"context"
	"encoding/json"
	"it-stone-server/models"
	"it-stone-server/firestore"
	"it-stone-server/helpers"
	"log"
	"os"
)

type SearchRepository interface {
	GetAnotherUser(ctx context.Context, field, value string) (*models.User, error)
	GetUser(ctx context.Context, field, value string) (*models.User, error)
	InsertUser(ctx context.Context, user *models.User) error
	DeleteUser(ctx context.Context, id string) error
}

type searchRepository struct {
	collection string
	idHelper   helpers.IDHelper
	clientFunc firestore.FirestoreClientFunc
}

func NewSearchRepository(clientFunc firestore.FirestoreClientFunc) SearchRepository {
	return &searchRepository{
		collection: "Search",
		idHelper:   helpers.NewIDHelper(),
		clientFunc: clientFunc,
	}
}

func (r *searchRepository) GetAnotherUser(ctx context.Context, field, value string) (*models.User, error) {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer db.Close()

	recordTmpMap, err := db.FindOneNotEqualField(r.collection, field, value)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var user models.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &user)
	return &user, nil
}

func (r *searchRepository) GetUser(ctx context.Context, field, value string) (*models.User, error) {
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

	var user models.User
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &user)
	return &user, nil
}

func (r *searchRepository) InsertUser(ctx context.Context, user *models.User) error {
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

func (r *searchRepository) DeleteUser(ctx context.Context, id string) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	return db.DeleteOneByID(r.collection, id)
}
