package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/go-openapi/errors"
	"io/ioutil"
	"it-stone-server/adapters/converters"
	"it-stone-server/domain"
	"it-stone-server/models"
	"it-stone-server/repository"
	"it-stone-server/restapi/operations"
	"log"
	"net/http"

	"github.com/coreos/go-oidc"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	"golang.org/x/net/context"
	"golang.org/x/oauth2" // OAuth2 client
)

var (
	// state carries an internal token during the oauth2 workflow
	// we just need a non empty initial value
	state = "foobar" // Don't make this a global in production.

	// the credentials for this API (adapt values when registering API)
	//clientID = "624575227054-60ko1nceteteqmkbrsolj9m51goqu6ur.apps.googleusercontent.com" // <= enter registered API client ID here

	clientID = "1078634773200-ds8m4l7a3gjaak27pgcg0l4tr4njefvm.apps.googleusercontent.com"

	//clientSecret = "z3X_VKhBEC7QXfNoGi4NbmHW" // <= enter registered API client secret here
	clientSecret = "IBLjw2m0FJ1ai7PbX_9PSiuY"

	// the Google login URL
	authURL = "https://accounts.google.com/o/oauth2/v2/auth"

	// the Google OAuth2 resource provider which delivers access tokens
	tokenURL    = "https://www.googleapis.com/oauth2/v4/token"
	userInfoURL = "https://www.googleapis.com/oauth2/v3/userinfo"

	// our endpoint to be called back by the redirected client
	//callbackURL = "http://0.0.0.0:12345/api/v0/auth/callback"

	callbackURL = "http://localhost:8090/api/v0/auth/callback"

	// the description of the OAuth2 flow
	endpoint = oauth2.Endpoint{
		AuthURL:  authURL,
		TokenURL: tokenURL,
	}

	config = oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		Endpoint:     endpoint,
		RedirectURL:  callbackURL,
		Scopes:       []string{oidc.ScopeOpenID, "profile", "email"},
	}
)

type AuthHandler interface {
	Login(r *http.Request) middleware.Responder
	Callback(r *http.Request) (string, error)
	Authenticated(token string) (bool, error)
	OAuthSecurity(token string) (*models.Principal, error)
	CallbackUserAndToken(params operations.CallbackParams) middleware.Responder

	requestToGoogleByToken(token string) ([]byte, int, error)
	getGoogleUser(token string) (*domain.GoogleUser, error)
}

type authHandler struct {
	utc converters.UserTokenConverter
}

func NewAuthHandler() AuthHandler {
	return &authHandler{
		converters.NewUserTokenConverter(),
	}
}

func (h *authHandler) Login(r *http.Request) middleware.Responder {
	// implements the login with a redirection
	return middleware.ResponderFunc(
		func(w http.ResponseWriter, pr runtime.Producer) {
			http.Redirect(w, r, config.AuthCodeURL(state), http.StatusFound)
		})
}

func (h *authHandler) Callback(r *http.Request) (string, error) {
	// we expect the redirected client to call us back
	// with 2 query params: state and code.
	// We use directly the Request params here, since we did not
	// bother to document these parameters in the spec.

	if r.URL.Query().Get("state") != state {
		log.Println("state did not match")
		return "", fmt.Errorf("state did not match")
	}

	myClient := &http.Client{}

	parentContext := context.Background()
	ctx := oidc.ClientContext(parentContext, myClient)

	authCode := r.URL.Query().Get("code")
	log.Printf("Authorization code: %v\n", authCode)

	// Exchange converts an authorization code into a token.
	// Under the hood, the oauth2 client POST a request to do so
	// at tokenURL, then redirects...
	oauth2Token, err := config.Exchange(ctx, authCode)
	if err != nil {
		log.Println("failed to exchange token", err.Error())
		return "", fmt.Errorf("failed to exchange token")
	}

	// the authorization server's returned token
	log.Println("Raw token data:", oauth2Token)
	return oauth2Token.AccessToken, nil
}

func (h *authHandler) Authenticated(token string) (bool, error) {
	// validates the token by sending a request at userInfoURL
	_, statusCode, err := h.requestToGoogleByToken(token)
	if statusCode != 200 {
		return false, fmt.Errorf("Authorization failed!\n%v", err)
	}
	return true, nil
}

func (h *authHandler) OAuthSecurity(token string) (*models.Principal, error) {
	ok, err := h.Authenticated(token)
	if err != nil {
		return nil, errors.New(401, err.Error())
	}
	if !ok {
		return nil, errors.New(401, "invalid token")
	}
	prin := models.Principal(token)
	return &prin, nil
}

func (h *authHandler) CallbackUserAndToken(params operations.CallbackParams) middleware.Responder {
	token, err := h.Callback(params.HTTPRequest)
	if err != nil {
		return middleware.NotImplemented(err.Error())
	}

	googleUser, err := h.getGoogleUser(token)
	if err != nil {
		return middleware.NotImplemented(err.Error())
	}

	user := domain.NewUser(googleUser)
	userRepository := repository.NewUserRepository()
	if _, err := userRepository.GetUser(user.ID); err != nil {
		err = userRepository.InsertUser(user)
		if err != nil {
			return middleware.NotImplemented(err.Error())
		}
	}

	domainUserToken := domain.NewUserToken(token, user)
	outUserToken := h.utc.FromDomain(domainUserToken)
	return operations.NewCallbackOK().WithPayload(outUserToken)
}

func (h *authHandler) requestToGoogleByToken(token string) ([]byte, int, error) {
	req, err := http.NewRequest("GET", userInfoURL, nil)
	if err != nil {
		return nil, 501, err
	}

	req.Header.Add("Authorization", fmt.Sprintf("Bearer %v", token))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, 501, err
	}

	defer func() {
		_ = resp.Body.Close()
	}()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, 501, err
	}
	if resp.StatusCode != 200 {
		return nil, 501, err
	}
	return body, resp.StatusCode, err
}

func (h *authHandler) getGoogleUser(token string) (*domain.GoogleUser, error) {
	body, statusCode, err := h.requestToGoogleByToken(token)
	ui := &domain.GoogleUser{}
	if statusCode == 200 {
		err := json.Unmarshal(body, ui)
		if err != nil {
			return nil, fmt.Errorf("Unmarshal failed! \n%v", err)
		}
	}
	log.Println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%__Users data:", *ui)
	return ui, err
}
