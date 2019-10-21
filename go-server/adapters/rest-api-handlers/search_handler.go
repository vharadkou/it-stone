package handlers

import (
	"context"
	"it-stone-server/adapters/converters"
	"it-stone-server/firestore"
	"it-stone-server/helpers"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations/search"
	"net/http"
	"sync"
	"time"

	"github.com/go-openapi/runtime/middleware"
)

type SearchHandler interface {
	SearchAnotherUser(params search.SearchAnotherParams, token *models.Token) middleware.Responder
}

type searchHandler struct {
	searchRepository repository.SearchRepository
	userConverter    converters.UserConverter
	jwtHelper        helpers.JWTHelper
}

func NewSearchHandler(searchRepository repository.SearchRepository) SearchHandler {
	return &searchHandler{
		searchRepository: searchRepository,
		userConverter:    converters.NewUserConverter(),
		jwtHelper:        helpers.NewJWTHelper(),
	}
}

var searchingUserField = "userName"
var waitTime = 10
var mutex = &sync.Mutex{}

func (h *searchHandler) SearchAnotherUser(params search.SearchAnotherParams, token *models.Token) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	firstState := models.State{}
	var user2 *models.User
	stateRepository := repository.NewStateRepository(firestore.NewFirestoreClient)

	//Recognise the user
	domainUser, err := h.jwtHelper.GetDomainUserFromToken(token)
	user1 := h.userConverter.FromDomain(domainUser)
	//Write user into DB
	err = h.searchRepository.InsertUser(ctx, user1)
	firstState.Player1 = user1 //Add user as player1 into new state

	//Searching for another player or created state near 60 sec
	for i := 0; i < waitTime; i++ {

		//Checking player in created states as player1
		ok, state := h.checkPlayerInStates(ctx, stateRepository, "player1.userName", user1)
		if ok {
			return search.NewSearchAnotherOK().WithPayload(state)
		}

		//Checking player in created states as player2
		ok, state = h.checkPlayerInStates(ctx, stateRepository, "player2.userName", user1)
		if ok {
			return search.NewSearchAnotherOK().WithPayload(state)
		}

		//START BLOCKADE_________________________
		mutex.Lock()
		ok = h.didPlayerDelete(ctx, mutex, user1)
		if ok {
			mutex.Unlock()
			continue
		}

		//Searching for another player
		user2, err = h.searchRepository.GetAnotherUser(ctx, searchingUserField, user1.UserName)
		if err != nil {
			mutex.Unlock()
			h.returnError(http.StatusText(http.StatusInternalServerError))
		}

		//If player2 was found
		if user2.UserName != "" {
			err = h.clearUsersFromSearch(ctx, user1, user2)
			if err != nil {
				mutex.Unlock()
				h.returnError(http.StatusText(http.StatusInternalServerError))
			}

			firstState.Player2 = user2 //Add another user as player2 into the state
			//Insert new state into DB
			err = stateRepository.InsertState(ctx, &firstState)
			if err != nil {
				mutex.Unlock()
				h.returnError(http.StatusText(http.StatusInternalServerError))
			}
			mutex.Unlock()
			return search.NewSearchAnotherOK().WithPayload(&firstState)
		}
		mutex.Unlock()
		//END BLOCKADE______________________________

		//Sleep 2 second
		time.Sleep(2 * time.Second)
	}

	//When time is over delete user from seacrhing collection
	err = h.searchRepository.DeleteUser(ctx, user1.ID)
	if err != nil {
		h.returnError(http.StatusText(http.StatusInternalServerError))
	}
	return search.NewSearchAnotherGatewayTimeout()
}

func (h *searchHandler) returnError(message string) middleware.Responder {
	return search.NewSearchAnotherDefault(http.StatusInternalServerError).WithPayload(&models.Error{
		Code:    http.StatusInternalServerError,
		Message: &message,
	})
}

func (h *searchHandler) checkPlayerInStates(ctx context.Context, stateRepository repository.StateRepository, searchingStateField string, user *models.User) (bool, *models.State) {
	//Checking player in created states as player2
	state, err := stateRepository.GetState(ctx, searchingStateField, user.UserName)
	if err != nil {
		h.returnError(http.StatusText(http.StatusInternalServerError))
	}

	//Player found into created state
	if state.Player1 != nil {
		//Delete player from search collection
		err = h.searchRepository.DeleteUser(ctx, user.ID)
		if err != nil {
			h.returnError(http.StatusText(http.StatusInternalServerError))
		}
		//Return found state with player
		return true, state
	}
	return false, nil
}

func (h *searchHandler) didPlayerDelete(ctx context.Context, mutex *sync.Mutex, user *models.User) bool {
	//Searching for player
	player, err := h.searchRepository.GetUser(ctx, searchingUserField, user.UserName)
	if err != nil {
		mutex.Unlock()
		h.returnError(http.StatusText(http.StatusInternalServerError))
	}
	if player.UserName == "" {
		return true
	}
	return false
}

func (h *searchHandler) clearUsersFromSearch(ctx context.Context, user1, user2 *models.User) error {
	//Delete users from seacrhing collection
	err := h.searchRepository.DeleteUser(ctx, user1.ID)
	if err != nil {
		return err
	}
	err = h.searchRepository.DeleteUser(ctx, user2.ID)
	if err != nil {
		return err
	}
	return err
}
