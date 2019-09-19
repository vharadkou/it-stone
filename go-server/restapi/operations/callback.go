// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	middleware "github.com/go-openapi/runtime/middleware"
)

// CallbackHandlerFunc turns a function with the right signature into a callback handler
type CallbackHandlerFunc func(CallbackParams) middleware.Responder

// Handle executing the request and returning a response
func (fn CallbackHandlerFunc) Handle(params CallbackParams) middleware.Responder {
	return fn(params)
}

// CallbackHandler interface for that can handle valid callback params
type CallbackHandler interface {
	Handle(CallbackParams) middleware.Responder
}

// NewCallback creates a new http.Handler for the callback operation
func NewCallback(ctx *middleware.Context, handler CallbackHandler) *Callback {
	return &Callback{Context: ctx, Handler: handler}
}

/*Callback swagger:route GET /v0/auth/callback callback

Return access_token and user

*/
type Callback struct {
	Context *middleware.Context
	Handler CallbackHandler
}

func (o *Callback) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewCallbackParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}
