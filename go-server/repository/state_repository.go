package repository

import (
	"context"
	"encoding/json"
	"it-stone-server/firestore"
	"it-stone-server/helpers"
	"it-stone-server/models"
	"log"
	"os"
)

type StateRepository interface {
	GetState(ctx context.Context, field, value string) (*models.State, error)
	InsertState(ctx context.Context, state *models.State) error
	UpdateState(ctx context.Context, state *models.State) error
	DeleteState(ctx context.Context, id string) error
}

type stateRepository struct {
	collection string
	idHelper   helpers.IDHelper
	clientFunc firestore.FirestoreClientFunc
}

func NewStateRepository(clientFunc firestore.FirestoreClientFunc) StateRepository {
	return &stateRepository{
		collection: "State",
		idHelper:   helpers.NewIDHelper(),
		clientFunc: clientFunc,
	}
}

func (r *stateRepository) GetState(ctx context.Context, field, value string) (*models.State, error) {
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

	var st models.State
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &st)
	return &st, nil
}

func (r *stateRepository) InsertState(ctx context.Context, state *models.State) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	state.ID = r.idHelper.GenerateID()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(state)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(r.collection, state.ID, data)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (r *stateRepository) UpdateState(ctx context.Context, state *models.State) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	state.ID = r.idHelper.GenerateID()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(state)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(r.collection, state.ID, data)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (r *stateRepository) DeleteState(ctx context.Context, id string) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	return db.DeleteOneByID(r.collection, id)
}
