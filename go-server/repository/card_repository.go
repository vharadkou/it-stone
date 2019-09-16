package repository

import (
	"context"
	"encoding/json"
	"google.golang.org/api/option"
	"it-stone-server/domain"
	"it-stone-server/helpers"
	"log"
	"os"
)

type CardWorker interface {
	getDbClient() (DbWorker, error)
	GetCard(id string) (*domain.Card, error)
	GetCards() ([]*domain.Card, error)
	InsertCard(card *domain.Card) (*string, error)
	DeleteCard(id string) error
	UpdateCard(id string, card *domain.Card) (*domain.Card, error)
}

type cardRepository struct {
	collection string
	idHelper   helpers.IDHelper
}

func NewCardRepository() CardWorker {
	return &cardRepository{
		"Cards",
		helpers.NewIDHelper(),
	}
}

func (cw *cardRepository) GetCard(id string) (*domain.Card, error) {
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

	var card domain.Card
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &card)
	return &card, nil
}

func (cw *cardRepository) GetCards() ([]*domain.Card, error) {
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

	var cards []*domain.Card
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &cards)
	return cards, nil
}

func (cw *cardRepository) InsertCard(domainCard *domain.Card) (*string, error) {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer func() {
		_ = db.Close()
	}()

	id := cw.idHelper.GenerateID()
	domainCard.ID = id

	var data map[string]interface{}
	jsonData, _ := json.Marshal(*domainCard)
	_ = json.Unmarshal(jsonData, &data)

	err = db.InsertOne(cw.collection, id, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	return &id, nil
}

func (cw *cardRepository) DeleteCard(id string) error {
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

func (cw *cardRepository) UpdateCard(id string, domainCard *domain.Card) (*domain.Card, error) {
	db, err := cw.getDbClient()
	if err != nil {
		log.Println(err)
		return nil, err
	}

	defer func() {
		_ = db.Close()
	}()

	domainCard.ID = id

	var data map[string]interface{}
	jsonData, _ := json.Marshal(*domainCard)
	_ = json.Unmarshal(jsonData, &data)

	recordTmpMap, err := db.UpdateOneByID(cw.collection, id, data)
	if err != nil {
		log.Println(err)
		return nil, err
	}

	var card domain.Card
	sb, _ := json.Marshal(recordTmpMap)
	_ = json.Unmarshal(sb, &card)
	return &card, nil
}

func (cw *cardRepository) getDbClient() (DbWorker, error) {
	dir, _ := os.Getwd()
	ctx := context.Background()
	co := option.WithCredentialsFile(dir + ConfigDbPath)
	return NewDbClient(ctx, co)
}
