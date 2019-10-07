package repository

import (
	"it-stone-server/firestore/mocks"
	helpersmocks "it-stone-server/helpers/mocks"
	"testing"
)

func TestCardRepository_InsertCard(t *testing.T) {
	t.Parallel()
	data := make(map[string]interface{})

	clientMock := mocks.FirestoreClient{}
	idHelperMock := helpersmocks.IDHelper{}

	idHelperMock.On("GenerateID").Return("id")
	clientMock.On("InsertOne", "mock.Anything", "mock.Anything", data).Return(nil)
	//clientMock.AssertExpectations(t)
}
