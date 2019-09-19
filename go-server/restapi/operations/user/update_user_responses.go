// Code generated by go-swagger; DO NOT EDIT.

package user

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	models "it-stone-server/models"
)

// UpdateUserOKCode is the HTTP code returned for type UpdateUserOK
const UpdateUserOKCode int = 200

/*UpdateUserOK Update success

swagger:response updateUserOK
*/
type UpdateUserOK struct {

	/*
	  In: Body
	*/
	Payload *models.User `json:"body,omitempty"`
}

// NewUpdateUserOK creates UpdateUserOK with default headers values
func NewUpdateUserOK() *UpdateUserOK {

	return &UpdateUserOK{}
}

// WithPayload adds the payload to the update user o k response
func (o *UpdateUserOK) WithPayload(payload *models.User) *UpdateUserOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the update user o k response
func (o *UpdateUserOK) SetPayload(payload *models.User) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *UpdateUserOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// UpdateUserNotFoundCode is the HTTP code returned for type UpdateUserNotFound
const UpdateUserNotFoundCode int = 404

/*UpdateUserNotFound The user not found.

swagger:response updateUserNotFound
*/
type UpdateUserNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewUpdateUserNotFound creates UpdateUserNotFound with default headers values
func NewUpdateUserNotFound() *UpdateUserNotFound {

	return &UpdateUserNotFound{}
}

// WithPayload adds the payload to the update user not found response
func (o *UpdateUserNotFound) WithPayload(payload *models.Error) *UpdateUserNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the update user not found response
func (o *UpdateUserNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *UpdateUserNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*UpdateUserDefault Unexpected error.

swagger:response updateUserDefault
*/
type UpdateUserDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewUpdateUserDefault creates UpdateUserDefault with default headers values
func NewUpdateUserDefault(code int) *UpdateUserDefault {
	if code <= 0 {
		code = 500
	}

	return &UpdateUserDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the update user default response
func (o *UpdateUserDefault) WithStatusCode(code int) *UpdateUserDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the update user default response
func (o *UpdateUserDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the update user default response
func (o *UpdateUserDefault) WithPayload(payload *models.Error) *UpdateUserDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the update user default response
func (o *UpdateUserDefault) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *UpdateUserDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
