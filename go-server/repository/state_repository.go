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

type StateRepository interface {
	GetState(ctx context.Context, field, value string) (*domain.Game, error)
	InsertState(ctx context.Context, game *domain.Game) error
	UpdateState(ctx context.Context, game *domain.Game) error
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

func (r *stateRepository) GetState(ctx context.Context, field, value string) (*domain.Game, error) {
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

	var game domain.Game
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &game)
	return &game, nil
}

func (r *stateRepository) InsertState(ctx context.Context, game *domain.Game) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	game.ID = r.idHelper.GenerateID()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(game)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(r.collection, game.ID, data)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (r *stateRepository) UpdateState(ctx context.Context, game *domain.Game) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	game.ID = r.idHelper.GenerateID()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(game)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(r.collection, game.ID, data)
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
