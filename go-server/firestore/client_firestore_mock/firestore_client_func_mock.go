package client_firestore_mock

import (
	"context"
	"it-stone-server/firestore"
)

func NewFirestoreClientFuncMock(client firestore.FirestoreClient, err error) func(context.Context, string) (firestore.FirestoreClient, error) {
	return func(ctx context.Context, projectId string) (firestore.FirestoreClient, error) {
		return client, err
	}
}
