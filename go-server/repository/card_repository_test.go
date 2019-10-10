package repository

import (
	"context"
	"errors"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"it-stone-server/domain"
	"it-stone-server/firestore/client_firestore_mock"
	firestoremocks "it-stone-server/firestore/mocks"
	"testing"
)

func TestCardRepository_InsertCard_Positive(t *testing.T) {
	t.Parallel()
	card := domain.Card{}
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("InsertOne", mock.Anything, mock.Anything, mock.Anything).Return(nil)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)

	id, err := cardRepository.InsertCard(context.Background(), &card)
	assert.Nil(t, err)
	assert.NotNil(t, id)

	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_InsertCard_Wrong_Client(t *testing.T) {
	t.Parallel()
	card := domain.Card{}
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	cardRepository := NewCardRepository(clientFuncMock)
	id, err := cardRepository.InsertCard(context.Background(), &card)
	assert.Nil(t, id)
	assert.NotNil(t, err)
}

func TestCardRepository_InsertCard_ErrorInsertOne(t *testing.T) {
	t.Parallel()
	card := domain.Card{}
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("InsertOne", mock.Anything, mock.Anything, mock.Anything).Return(errorMock)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)
	id, err := cardRepository.InsertCard(context.Background(), &card)
	assert.Nil(t, id)
	assert.NotNil(t, err)
	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_GetCardByField_Positive(t *testing.T) {
	t.Parallel()
	record := make(map[string]interface{})
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindOneByField", mock.Anything, mock.Anything, mock.Anything).Return(record, nil)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)

	card, err := cardRepository.GetCardByField(context.Background(), "some field", "some value")
	assert.NotNil(t, card)
	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_GetCardByField_WrongClient(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	cardRepository := NewCardRepository(clientFuncMock)
	id, err := cardRepository.GetCardByField(context.Background(), "some field", "some value")
	assert.Nil(t, id)
	assert.NotNil(t, err)
}

func TestCardRepository_GetCardByField_ErrorFindOneByField(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindOneByField", mock.Anything, mock.Anything, mock.Anything).Return(nil, errorMock)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)
	card, err := cardRepository.GetCardByField(context.Background(), "some field", "some value")
	assert.Nil(t, card)
	assert.NotNil(t, err)
	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_GetCards_Positive(t *testing.T) {
	t.Parallel()
	records := make([]map[string]interface{}, 0)

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindAll", mock.Anything, mock.Anything, mock.Anything).Return(records, nil)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)

	cards, err := cardRepository.GetCards(context.Background())
	assert.NotNil(t, cards)
	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_GetCards_WrongClient(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	cardRepository := NewCardRepository(clientFuncMock)
	cards, err := cardRepository.GetCards(context.Background())
	assert.Nil(t, cards)
	assert.NotNil(t, err)
}

func TestCardRepository_GetCards_ErrorFindAll(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindAll", mock.Anything, mock.Anything, mock.Anything).Return(nil, errorMock)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)
	cards, err := cardRepository.GetCards(context.Background())
	assert.Nil(t, cards)
	assert.NotNil(t, err)
	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_DeleteCard_Positive(t *testing.T) {
	t.Parallel()
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("DeleteOneByID", mock.Anything, mock.Anything, mock.Anything).Return(nil)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)

	err := cardRepository.DeleteCard(context.Background(), "some id")
	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_DeleteCard_WrongClient(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	cardRepository := NewCardRepository(clientFuncMock)
	err := cardRepository.DeleteCard(context.Background(), "some id")
	assert.NotNil(t, err)
}

func TestCardRepository_UpdateCard_Positive(t *testing.T) {
	t.Parallel()
	card := domain.Card{}
	data := make(map[string]interface{})
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("UpdateOneByID", mock.Anything, mock.Anything, mock.Anything).Return(data, nil)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)

	updatedCard, err := cardRepository.UpdateCard(context.Background(), "some id", &card)
	assert.NotNil(t, updatedCard)
	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestCardRepository_UpdateCard_WrongClient(t *testing.T) {
	t.Parallel()
	card := domain.Card{}
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	cardRepository := NewCardRepository(clientFuncMock)
	updatedCard, err := cardRepository.UpdateCard(context.Background(), "some id", &card)
	assert.NotNil(t, err)
	assert.Nil(t, updatedCard)
}

func TestCardRepository_UpdateCard_ErrorUpdateOneByID(t *testing.T) {
	t.Parallel()
	card := domain.Card{}
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("UpdateOneByID", mock.Anything, mock.Anything, mock.Anything).Return(nil, errorMock)
	firestoreClientMock.On("Close").Return(nil)

	cardRepository := NewCardRepository(clientFuncMock)
	updatedCard, err := cardRepository.UpdateCard(context.Background(), "some id", &card)
	assert.Nil(t, updatedCard)
	assert.NotNil(t, err)
	firestoreClientMock.AssertExpectations(t)
}
