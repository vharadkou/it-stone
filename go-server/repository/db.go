package repository

import (
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
	"time"
)

// DbWorker Interface
type DbWorker interface {
	Close() error
	InsertOne(collection, id string, data map[string]interface{}) error
	FindAll(collection string) ([]map[string]interface{}, error)
	FindOneByID(collection, id string) (map[string]interface{}, error)
	DeleteOneByID(collection, id string) error
	UpdateOneByID(collection, id string, data map[string]interface{}) (map[string]interface{}, error)
}

// DbFirestore Struct
type dbFirestore struct {
	ctx    context.Context
	Client *firestore.Client
}

// ConfigDbPath const
const ConfigDbPath string = "/repository/config.json"

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

func (db *dbFirestore) InsertOne(collection, id string, data map[string]interface{}) error {
	_, err := db.Client.Collection(collection).Doc(id).Set(db.ctx, data)
	if err != nil {
		return err
	}

	return nil
}

func (db *dbFirestore) FindAll(collection string) ([]map[string]interface{}, error) {
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

	return records, nil
}

func (db *dbFirestore) FindOneByID(collection, id string) (map[string]interface{}, error) {
	return db.getDocument(collection, id)
}

func (db *dbFirestore) DeleteOneByID(collection, id string) error {
	_, err := db.Client.Collection(collection).Doc(id).Delete(db.ctx)
	return err
}

func (db *dbFirestore) UpdateOneByID(collection, id string, data map[string]interface{}) (map[string]interface{}, error) {
	_, err := db.Client.Collection(collection).Doc(id).Set(db.ctx, data, firestore.MergeAll)
	if err != nil {
		return nil, err
	}
	return db.getDocument(collection, id)
}

func (db *dbFirestore) getDocument(collection, id string) (map[string]interface{}, error) {
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
	return recordTmp, nil
}
