package firestore

import (
	"cloud.google.com/go/firestore"
	"context"
	"google.golang.org/api/iterator"
	"os"
)

// DbWorker Interface
type FirestoreClient interface {
	Close() error
	InsertOne(collection, id string, data map[string]interface{}) error
	FindAll(collection string) ([]map[string]interface{}, error)
	FindOneByField(collection, field, value string) (map[string]interface{}, error)
	DeleteOneByID(collection, id string) error
	UpdateOneByID(collection, id string, data map[string]interface{}) (map[string]interface{}, error)
}

// DbFirestore Struct
type firestoreClient struct {
	ctx        context.Context
	cancelFunc context.CancelFunc
	Client     *firestore.Client
}

// NewDbClient - Creating a new db client
func NewDbClient(ctx context.Context, cancelFunc context.CancelFunc) (FirestoreClient, error) {
	client, err := firestore.NewClient(ctx, os.Getenv("project_id"))
	if err != nil {
		return nil, err
	}
	return &firestoreClient{
		ctx:        ctx,
		cancelFunc: cancelFunc,
		Client:     client,
	}, nil
}

func (db *firestoreClient) Close() error {
	return db.Client.Close()
}

func (db *firestoreClient) InsertOne(collection, id string, data map[string]interface{}) error {
	defer func() {
		db.cancelFunc()
	}()

	_, err := db.Client.Collection(collection).Doc(id).Set(db.ctx, data)
	if err != nil {
		return err
	}

	return nil
}

func (db *firestoreClient) FindAll(collection string) ([]map[string]interface{}, error) {
	defer func() {
		db.cancelFunc()
	}()

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

func (db *firestoreClient) FindOneByField(collection, field, value string) (map[string]interface{}, error) {
	defer func() {
		db.cancelFunc()
	}()

	var record map[string]interface{}
	iter := db.Client.Collection(collection).Where(field, "==", value).Documents(db.ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}

		err = doc.DataTo(&record)
		if err != nil {
			return nil, err
		}
		break
	}

	return record, nil
}

func (db *firestoreClient) DeleteOneByID(collection, id string) error {
	defer func() {
		db.cancelFunc()
	}()

	_, err := db.Client.Collection(collection).Doc(id).Delete(db.ctx)
	return err
}

func (db *firestoreClient) UpdateOneByID(collection, id string, data map[string]interface{}) (map[string]interface{}, error) {
	defer func() {
		db.cancelFunc()
	}()

	_, err := db.Client.Collection(collection).Doc(id).Set(db.ctx, data, firestore.MergeAll)
	if err != nil {
		return nil, err
	}
	return db.FindOneByField(collection, "id", id)
}
