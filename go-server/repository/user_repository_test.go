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

func TestUserRepository_InsertUser(t *testing.T) {
	t.Parallel()
	user := domain.User{}
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("InsertOne", mock.Anything, mock.Anything, mock.Anything).Return(nil)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)

	err := userRepository.InsertUser(context.Background(), &user)

	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_InsertUser_WrongClient(t *testing.T) {
	t.Parallel()
	user := domain.User{}
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	userRepository := NewUserRepository(clientFuncMock)
	err := userRepository.InsertUser(context.Background(), &user)

	assert.NotNil(t, err)
}

func TestUserRepository_InsertUser_ErrorInsertOne(t *testing.T) {
	t.Parallel()
	user := domain.User{}
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("InsertOne", mock.Anything, mock.Anything, mock.Anything).Return(errorMock)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	err := userRepository.InsertUser(context.Background(), &user)

	assert.NotNil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_GetUserByField_Positive(t *testing.T) {
	t.Parallel()
	record := make(map[string]interface{})
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindOneByField", mock.Anything, mock.Anything, mock.Anything).Return(record, nil)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	user, err := userRepository.GetUserByField(context.Background(), "some field", "some value")

	assert.NotNil(t, user)
	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_GetUserByField_WrongClient(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	userRepository := NewUserRepository(clientFuncMock)
	user, err := userRepository.GetUserByField(context.Background(), "some field", "some value")

	assert.Nil(t, user)
	assert.NotNil(t, err)
}

func TestUserRepository_GetUserByField_ErrorFindOneByField(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindOneByField", mock.Anything, mock.Anything, mock.Anything).Return(nil, errorMock)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	user, err := userRepository.GetUserByField(context.Background(), "some field", "some value")

	assert.Nil(t, user)
	assert.NotNil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_GetUsers_Positive(t *testing.T) {
	t.Parallel()
	records := make([]map[string]interface{}, 0)

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindAll", mock.Anything, mock.Anything, mock.Anything).Return(records, nil)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	users, err := userRepository.GetUsers(context.Background())

	assert.NotNil(t, users)
	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_GetUsers_WrongClient(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	userRepository := NewUserRepository(clientFuncMock)
	users, err := userRepository.GetUsers(context.Background())

	assert.Nil(t, users)
	assert.NotNil(t, err)
}

func TestUserRepository_GetUsers_ErrorFindAll(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("FindAll", mock.Anything, mock.Anything, mock.Anything).Return(nil, errorMock)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	users, err := userRepository.GetUsers(context.Background())

	assert.Nil(t, users)
	assert.NotNil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_DeleteUser_Positive(t *testing.T) {
	t.Parallel()
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("DeleteOneByID", mock.Anything, mock.Anything, mock.Anything).Return(nil)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	err := userRepository.DeleteUser(context.Background(), "some id")

	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_DeleteUser_WrongClient(t *testing.T) {
	t.Parallel()
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	userRepository := NewUserRepository(clientFuncMock)
	err := userRepository.DeleteUser(context.Background(), "some id")

	assert.NotNil(t, err)
}

func TestUserRepository_UpdateUser_Positive(t *testing.T) {
	t.Parallel()
	user := domain.User{}
	data := make(map[string]interface{})
	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("UpdateOneByID", mock.Anything, mock.Anything, mock.Anything).Return(data, nil)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	updatedUser, err := userRepository.UpdateUser(context.Background(), "some id", &user)

	assert.NotNil(t, updatedUser)
	assert.Nil(t, err)

	firestoreClientMock.AssertExpectations(t)
}

func TestUserRepository_UpdateUser_WrongClient(t *testing.T) {
	t.Parallel()
	user := domain.User{}
	errorMock := errors.New("some error")

	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(nil, errorMock)

	userRepository := NewUserRepository(clientFuncMock)
	updatedUser, err := userRepository.UpdateUser(context.Background(), "some id", &user)

	assert.NotNil(t, err)
	assert.Nil(t, updatedUser)
}

func TestUserRepository_UpdateUser_ErrorUpdateOneByID(t *testing.T) {
	t.Parallel()
	user := domain.User{}
	errorMock := errors.New("some error")

	firestoreClientMock := &firestoremocks.FirestoreClient{}
	clientFuncMock := client_firestore_mock.NewFirestoreClientFuncMock(firestoreClientMock, nil)

	firestoreClientMock.On("UpdateOneByID", mock.Anything, mock.Anything, mock.Anything).Return(nil, errorMock)
	firestoreClientMock.On("Close").Return(nil)

	userRepository := NewUserRepository(clientFuncMock)
	updatedUser, err := userRepository.UpdateUser(context.Background(), "some id", &user)

	assert.Nil(t, updatedUser)
	assert.NotNil(t, err)

	firestoreClientMock.AssertExpectations(t)
}
