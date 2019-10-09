package domain

import (
	"os"
)

type FirestoreConfig struct {
	Type                    string `json:"type"`
	TokenUri                string `json:"token_uri"`
	ProjectId               string `json:"project_id"`
	PrivateKeyId            string `json:"private_key_id"`
	PrivateKey              string `json:"private_key"`
	ClientEmail             string `json:"client_email"`
	ClientId                string `json:"client_id"`
	AuthUri                 string `json:"auth_uri"`
	AuthProviderX509CertUrl string `json:"auth_provider_x509_cert_url"`
	ClientX509CertUrl       string `json:"client_x509_cert_url"`
}

func NewFirestoreConfig() *FirestoreConfig {
	return &FirestoreConfig{
		Type:                    os.Getenv("type"),
		TokenUri:                os.Getenv("token_uri"),
		ProjectId:               os.Getenv("project_id"),
		PrivateKeyId:            os.Getenv("private_key_id"),
		PrivateKey:              os.Getenv("private_key"),
		ClientEmail:             os.Getenv("client_email"),
		ClientId:                os.Getenv("client_id"),
		AuthUri:                 os.Getenv("auth_uri"),
		AuthProviderX509CertUrl: os.Getenv("auth_provider_x509_cert_url"),
		ClientX509CertUrl:       os.Getenv("client_x509_cert_url"),
	}
}
