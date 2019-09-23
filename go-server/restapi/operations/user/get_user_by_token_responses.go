// Code generated by go-swagger; DO NOT EDIT.

package user

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	models "it-stone-server/models"
)

// GetUserByTokenOKCode is the HTTP code returned for type GetUserByTokenOK
const GetUserByTokenOKCode int = 200

/*GetUserByTokenOK Success

swagger:response getUserByTokenOK
*/
type GetUserByTokenOK struct {

	/*
	  In: Body
	*/
	Payload *models.User `json:"body,omitempty"`
}

// NewGetUserByTokenOK creates GetUserByTokenOK with default headers values
func NewGetUserByTokenOK() *GetUserByTokenOK {

	return &GetUserByTokenOK{}
}

// WithPayload adds the payload to the get user by token o k response
func (o *GetUserByTokenOK) WithPayload(payload *models.User) *GetUserByTokenOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get user by token o k response
func (o *GetUserByTokenOK) SetPayload(payload *models.User) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUserByTokenOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetUserByTokenUnauthorizedCode is the HTTP code returned for type GetUserByTokenUnauthorized
const GetUserByTokenUnauthorizedCode int = 401

/*GetUserByTokenUnauthorized Authentication information is missing or invalid

swagger:response getUserByTokenUnauthorized
*/
type GetUserByTokenUnauthorized struct {
	/*

	 */
	WWWAuthenticate string `json:"WWW_Authenticate"`
}

// NewGetUserByTokenUnauthorized creates GetUserByTokenUnauthorized with default headers values
func NewGetUserByTokenUnauthorized() *GetUserByTokenUnauthorized {

	return &GetUserByTokenUnauthorized{}
}

// WithWWWAuthenticate adds the wWWAuthenticate to the get user by token unauthorized response
func (o *GetUserByTokenUnauthorized) WithWWWAuthenticate(wWWAuthenticate string) *GetUserByTokenUnauthorized {
	o.WWWAuthenticate = wWWAuthenticate
	return o
}

// SetWWWAuthenticate sets the wWWAuthenticate to the get user by token unauthorized response
func (o *GetUserByTokenUnauthorized) SetWWWAuthenticate(wWWAuthenticate string) {
	o.WWWAuthenticate = wWWAuthenticate
}

// WriteResponse to the client
func (o *GetUserByTokenUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	// response header WWW_Authenticate

	wWWAuthenticate := o.WWWAuthenticate
	if wWWAuthenticate != "" {
		rw.Header().Set("WWW_Authenticate", wWWAuthenticate)
	}

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(401)
}

// GetUserByTokenNotFoundCode is the HTTP code returned for type GetUserByTokenNotFound
const GetUserByTokenNotFoundCode int = 404

/*GetUserByTokenNotFound The user with the specified ID was not found.

swagger:response getUserByTokenNotFound
*/
type GetUserByTokenNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetUserByTokenNotFound creates GetUserByTokenNotFound with default headers values
func NewGetUserByTokenNotFound() *GetUserByTokenNotFound {

	return &GetUserByTokenNotFound{}
}

// WithPayload adds the payload to the get user by token not found response
func (o *GetUserByTokenNotFound) WithPayload(payload *models.Error) *GetUserByTokenNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get user by token not found response
func (o *GetUserByTokenNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUserByTokenNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*GetUserByTokenDefault Internal server error

swagger:response getUserByTokenDefault
*/
type GetUserByTokenDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetUserByTokenDefault creates GetUserByTokenDefault with default headers values
func NewGetUserByTokenDefault(code int) *GetUserByTokenDefault {
	if code <= 0 {
		code = 500
	}

	return &GetUserByTokenDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the get user by token default response
func (o *GetUserByTokenDefault) WithStatusCode(code int) *GetUserByTokenDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the get user by token default response
func (o *GetUserByTokenDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the get user by token default response
func (o *GetUserByTokenDefault) WithPayload(payload *models.Error) *GetUserByTokenDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get user by token default response
func (o *GetUserByTokenDefault) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUserByTokenDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
