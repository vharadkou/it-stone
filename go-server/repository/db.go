package repository

import (
	"cloud.google.com/go/firestore"
	"context"
	"encoding/json"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"time"
)

// DbWorker Interface
type DbWorker interface {
	Close() error
	InsertOne(collection, id string, data map[string]interface{}) error
	FindAll(collection string) ([]byte, error)
	FindOneByID(collection, id string) ([]byte, error)
}

// DbFirestore Struct
type dbFirestore struct {
	ctx    context.Context
	Client *firestore.Client
}

// ConfigDbPath const
const ConfigDbPath string = "./config/IT-Stone-31e4a1a8f90f.json"

// NewDbClient - Creating a new db client
func NewDbClient(ctx context.Context, co option.ClientOption) (DbWorker, error) {
	app, err := firebase.NewApp(ctx, nil, co)
	if err != nil {
		return nil, err
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		return nil, err
	}
	return &dbFirestore{
		ctx:    ctx,
		Client: client,
	}, nil
}

// Close func
func (db *dbFirestore) Close() error {
	return db.Client.Close()
}

// InsertOne -Вставка документа в уже созданную коллекцию
func (db *dbFirestore) InsertOne(collection, id string, data map[string]interface{}) error {
	_, err := db.Client.Collection(collection).Doc(id).Set(db.ctx, data)
	if err != nil {
		return err
	}

	return nil
}

func (db *dbFirestore) FindAll(collection string) ([]byte, error) {
	var records []map[string]interface{}

	iter := db.Client.Collection(collection).Documents(db.ctx)

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		var recordTmp map[string]interface{}

		err = doc.DataTo(&recordTmp)
		if err != nil {
			return nil, err
		}
		records = append(records, recordTmp)
	}

	sb, err := json.Marshal(records)
	if err != nil {
		return nil, err
	}
	return sb, nil
}

func (db *dbFirestore) FindOneByID(collection, id string) ([]byte, error) {
	return db.getDocument(collection, id)
}

func (db *dbFirestore) getDocument(collection, id string) ([]byte, error) {
	var recordTmp map[string]interface{}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer func() {
		cancel()
	}()

	doc, err := db.Client.Collection(collection).Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}
	err = doc.DataTo(&recordTmp)
	if err != nil {
		return nil, err
	}
	sb, err := json.Marshal(recordTmp)
	if err != nil {
		return nil, err
	}
	return sb, nil
}
