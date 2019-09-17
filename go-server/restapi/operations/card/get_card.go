// Code generated by go-swagger; DO NOT EDIT.

package card

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	middleware "github.com/go-openapi/runtime/middleware"
)

// GetCardHandlerFunc turns a function with the right signature into a get card handler
type GetCardHandlerFunc func(GetCardParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetCardHandlerFunc) Handle(params GetCardParams) middleware.Responder {
	return fn(params)
}

// GetCardHandler interface for that can handle valid get card params
type GetCardHandler interface {
	Handle(GetCardParams) middleware.Responder
}

// NewGetCard creates a new http.Handler for the get card operation
func NewGetCard(ctx *middleware.Context, handler GetCardHandler) *GetCard {
	return &GetCard{Context: ctx, Handler: handler}
}

/*GetCard swagger:route GET /v0/cards/{id} card getCard

Receiving one card by ID

*/
type GetCard struct {
	Context *middleware.Context
	Handler GetCardHandler
}

func (o *GetCard) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewGetCardParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}
