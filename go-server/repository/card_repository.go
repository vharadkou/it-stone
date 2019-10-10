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

type CardRepository interface {
	GetCardByField(ctx context.Context, field, value string) (*domain.Card, error)
	GetCards(ctx context.Context) ([]*domain.Card, error)
	InsertCard(ctx context.Context, card *domain.Card) (*string, error)
	DeleteCard(ctx context.Context, id string) error
	UpdateCard(ctx context.Context, id string, card *domain.Card) (*domain.Card, error)
}

type cardRepository struct {
	collection string
	idHelper   helpers.IDHelper
	clientFunc firestore.FirestoreClientFunc
}

func NewCardRepository(clientFunc firestore.FirestoreClientFunc) CardRepository {
	return &cardRepository{
		collection: "Cards",
		idHelper:   helpers.NewIDHelper(),
		clientFunc: clientFunc,
	}
}

func (r *cardRepository) GetCardByField(ctx context.Context, field, value string) (*domain.Card, error) {
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

	var card domain.Card
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &card)
	return &card, nil
}

func (r *cardRepository) GetCards(ctx context.Context) ([]*domain.Card, error) {
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

	var cards []*domain.Card
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &cards)
	return cards, nil
}

func (r *cardRepository) InsertCard(ctx context.Context, domainCard *domain.Card) (*string, error) {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer db.Close()

	id := r.idHelper.GenerateID()
	domainCard.ID = id

	var data map[string]interface{}
	jsonData, _ := json.Marshal(*domainCard)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(r.collection, id, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return &id, nil
}

func (r *cardRepository) DeleteCard(ctx context.Context, id string) error {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return err
	}

	defer db.Close()

	return db.DeleteOneByID(r.collection, id)
}

func (r *cardRepository) UpdateCard(ctx context.Context, id string, domainCard *domain.Card) (*domain.Card, error) {
	db, err := r.clientFunc(ctx, os.Getenv("project_id"))
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer db.Close()

	domainCard.ID = id

	var data map[string]interface{}
	jsonData, _ := json.Marshal(*domainCard)
	_ = json.Unmarshal(jsonData, &data)

	recordTmpMap, err := db.UpdateOneByID(r.collection, id, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var card domain.Card
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &card)
	return &card, nil
}
