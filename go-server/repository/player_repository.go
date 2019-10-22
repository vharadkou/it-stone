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

type PlayerRepository interface {
	GetAnotherPlayer(ctx context.Context, field, value string) (*domain.Player, error)
	GetPlayer(ctx context.Context, field, value string) (*domain.Player, error)
	InsertPlayer(ctx context.Context, player *domain.Player) error
	DeletePlayer(ctx context.Context, id string) error
}

type playerRepository struct {
	collection string
	idHelper   helpers.IDHelper
	clientFunc firestore.FirestoreClientFunc
}

func NewPlayerRepository(clientFunc firestore.FirestoreClientFunc) PlayerRepository {
	return &playerRepository{
		collection: "Search",
		idHelper:   helpers.NewIDHelper(),
		clientFunc: clientFunc,
	}
}

func (r *playerRepository) GetAnotherPlayer(ctx context.Context, field, value string) (*domain.Player, error) {
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

	var player domain.Player
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &player)
	return &player, nil
}

func (r *playerRepository) GetPlayer(ctx context.Context, field, value string) (*domain.Player, error) {
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

	var player domain.Player
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &player)
	return &player, nil
}

func (r *playerRepository) InsertPlayer(ctx context.Context, player *domain.Player) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	player.ID = r.idHelper.GenerateID()

	var data map[string]interface{}
	jsonData, _ := json.Marshal(player)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(r.collection, player.ID, data)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (r *playerRepository) DeletePlayer(ctx context.Context, id string) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	return db.DeleteOneByID(r.collection, id)
}
