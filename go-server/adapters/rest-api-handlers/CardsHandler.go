package handlers

import (
	"context"
	"encoding/json"
	"github.com/go-openapi/runtime/middleware"
	"google.golang.org/api/option"
	"it-stone/helpers"
	"it-stone/models"
	"it-stone/repository"
	"it-stone/restapi/operations/card"
	"log"
	"net/http"
	"os"
)

// CardsHandler interface
type CardsHandler interface {
	GetCard(params card.GetCardParams) middleware.Responder
	GetCards(params card.GetCardsParams) middleware.Responder
	InsertCards(params card.CreateCardParams) middleware.Responder
}

type cardsHandler struct {
	idHelper helpers.IDHelper
}

// NewCardsHandler func
func NewCardsHandler() CardsHandler {
	return &cardsHandler{
		idHelper: helpers.NewIDHelper(),
	}
}

func (h *cardsHandler) GetCard(params card.GetCardParams) middleware.Responder {
	dir, _ := os.Getwd()

	ctx := context.Background()
	co := option.WithCredentialsFile(dir + repository.ConfigDbPath)
	db, err := repository.NewDbClient(ctx, co)
	if err != nil {
		log.Println(err)
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	sb, err := db.FindOneByID("Cards", params.ID)
	if err != nil {
		log.Println(err)
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	var cardItem *models.Card

	_ = json.Unmarshal(sb, &cardItem)

	return card.NewGetCardOK().WithPayload(cardItem)
}

func (h *cardsHandler) GetCards(params card.GetCardsParams) middleware.Responder {
	dir, _ := os.Getwd()

	ctx := context.Background()
	co := option.WithCredentialsFile(dir + repository.ConfigDbPath)
	db, err := repository.NewDbClient(ctx, co)

	if err != nil {
		log.Println(err)
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardsDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	sb, err := db.FindAll("Cards")
	if err != nil {
		log.Println(err)
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewGetCardsDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	var cards []*models.Card

	_ = json.Unmarshal(sb, &cards)

	return card.NewGetCardsOK().WithPayload(cards)
}

func (h *cardsHandler) InsertCards(params card.CreateCardParams) middleware.Responder {
	dir, _ := os.Getwd()

	ctx := context.Background()
	co := option.WithCredentialsFile(dir + repository.ConfigDbPath)
	db, err := repository.NewDbClient(ctx, co)
	if err != nil {
		log.Println(err)
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewCreateCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	params.Card.ID = h.idHelper.GenerateID()

	var inInterface map[string]interface{}
	inrec, _ := json.Marshal(params.Card)
	_ = json.Unmarshal(inrec, &inInterface)

	err = db.InsertOne("Cards", params.Card.ID, inInterface)
	if err != nil {
		log.Println(err)
		errMsg := http.StatusText(http.StatusInternalServerError)
		return card.NewCreateCardDefault(http.StatusInternalServerError).WithPayload(&models.Error{
			Code:    http.StatusInternalServerError,
			Message: &errMsg,
		})
	}

	createdId := params.Card.ID
	createdEntity := &models.CreatedEntity{ID: &createdId}

	return card.NewCreateCardCreated().WithPayload(createdEntity)
}
