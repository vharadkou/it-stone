package handlers

import (
	"context"
	"it-stone-server/adapters/converters"
	"it-stone-server/domain"
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
	playerRepository repository.PlayerRepository
	stateRepository  repository.StateRepository
	playerConverter  converters.PlayerConverter
	gameConverter    converters.GameConverter
	jwtHelper        helpers.JWTHelper
}

func NewSearchHandler(playerRepository repository.PlayerRepository, stateRepository repository.StateRepository) SearchHandler {
	return &searchHandler{
		playerRepository: playerRepository,
		stateRepository:  stateRepository,
		playerConverter:  converters.NewPlayerConverter(),
		gameConverter:    converters.NewGameConverter(),
		jwtHelper:        helpers.NewJWTHelper(),
	}
}

var searchingUserField = "userName"
var waitTime = 10
var mutex = &sync.Mutex{}

func (h *searchHandler) SearchAnotherUser(params search.SearchAnotherParams, token *models.Token) middleware.Responder {
	ctx := params.HTTPRequest.Context()
	game := domain.Game{}
	var player2 *domain.Player

	//Recognise the user
	domainUser, err := h.jwtHelper.GetDomainUserFromToken(token)
	player1 := h.playerConverter.FromUserToPlayer(domainUser)
	//Write user into DB
	err = h.playerRepository.InsertPlayer(ctx, player1)
	game.Player1 = player1 //Add user as player1 into new state

	//Searching for another player or created state near 60 sec
	for i := 0; i < waitTime; i++ {

		//Checking player in created states as player1
		ok, gm := h.checkPlayerInStates(ctx, "player1.userName", player1)
		if ok {
			state := h.gameConverter.FromDomain(gm)
			return search.NewSearchAnotherOK().WithPayload(state)
		}
		//Checking player in created states as player2
		ok, gm = h.checkPlayerInStates(ctx, "player2.userName", player1)
		if ok {
			state := h.gameConverter.FromDomain(gm)
			return search.NewSearchAnotherOK().WithPayload(state)
		}
		//START BLOCKADE_________________________
		mutex.Lock()
		ok = h.didPlayerDelete(ctx, mutex, player1)
		if ok {
			mutex.Unlock()
			continue
		}
		//Searching for another player
		player2, err = h.playerRepository.GetAnotherPlayer(ctx, searchingUserField, player1.UserName)
		if err != nil {
			mutex.Unlock()
			h.returnError(http.StatusText(http.StatusInternalServerError))
		}
		//If player2 was found
		if player2.UserName != "" {
			err = h.clearUsersFromSearch(ctx, player1, player2)
			if err != nil {
				mutex.Unlock()
				h.returnError(http.StatusText(http.StatusInternalServerError))
			}
			game.Player2 = player2 //Add another user as player2 into the state
			//Insert new state into DB
			err = h.stateRepository.InsertState(ctx, &game)
			if err != nil {
				mutex.Unlock()
				h.returnError(http.StatusText(http.StatusInternalServerError))
			}

			mutex.Unlock()

			firstState := h.gameConverter.FromDomain(&game)
			return search.NewSearchAnotherOK().WithPayload(firstState)
		}

		mutex.Unlock()
		//END BLOCKADE______________________________

		//Sleep 2 second
		time.Sleep(2 * time.Second)
	}

	//When time is over delete user from seacrhing collection
	err = h.playerRepository.DeletePlayer(ctx, player1.ID)
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

func (h *searchHandler) checkPlayerInStates(ctx context.Context, searchingStateField string, player *domain.Player) (bool, *domain.Game) {
	//Checking player in created states as player2
	state, err := h.stateRepository.GetState(ctx, searchingStateField, player.UserName)
	if err != nil {
		h.returnError(http.StatusText(http.StatusInternalServerError))
	}

	//Player found into created state
	if state.Player1 != nil {
		//Delete player from search collection
		err = h.playerRepository.DeletePlayer(ctx, player.ID)
		if err != nil {
			h.returnError(http.StatusText(http.StatusInternalServerError))
		}
		//Return found state with player
		return true, state
	}
	return false, nil
}

func (h *searchHandler) didPlayerDelete(ctx context.Context, mutex *sync.Mutex, player *domain.Player) bool {
	//Searching for player
	player, err := h.playerRepository.GetPlayer(ctx, searchingUserField, player.UserName)
	if err != nil {
		mutex.Unlock()
		h.returnError(http.StatusText(http.StatusInternalServerError))
	}
	if player.UserName == "" {
		return true
	}
	return false
}

func (h *searchHandler) clearUsersFromSearch(ctx context.Context, player1, player2 *domain.Player) error {
	//Delete users from seacrhing collection
	err := h.playerRepository.DeletePlayer(ctx, player1.ID)
	if err != nil {
		return err
	}
	err = h.playerRepository.DeletePlayer(ctx, player2.ID)
	if err != nil {
		return err
	}
	return err
}
