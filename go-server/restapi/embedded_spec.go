// Code generated by go-swagger; DO NOT EDIT.

package restapi

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"encoding/json"
)

var (
	// SwaggerJSON embedded version of the swagger document used at generation time
	SwaggerJSON json.RawMessage
	// FlatSwaggerJSON embedded flattened version of the swagger document used at generation time
	FlatSwaggerJSON json.RawMessage
)

func init() {
	SwaggerJSON = json.RawMessage([]byte(`{
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "schemes": [
    "http"
  ],
  "swagger": "2.0",
  "info": {
    "description": "Description for API Server",
    "title": "IT-Stone Server",
    "version": "0.0.2"
  },
  "basePath": "/api",
  "paths": {
    "/v0/cards": {
      "get": {
        "tags": [
          "card"
        ],
        "summary": "Receiving all cards",
        "operationId": "getCards",
        "responses": {
          "200": {
            "description": "Cards array",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Card"
              }
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "tags": [
          "card"
        ],
        "summary": "Create a new card",
        "operationId": "createCard",
        "parameters": [
          {
            "name": "card",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/CreatedEntity"
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/cards/{id}": {
      "get": {
        "tags": [
          "card"
        ],
        "summary": "Receiving one card by ID",
        "operationId": "getCard",
        "responses": {
          "200": {
            "description": "Return a card with the specified ID",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "404": {
            "description": "The card with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "tags": [
          "card"
        ],
        "summary": "Update one card by ID",
        "operationId": "updateCard",
        "parameters": [
          {
            "name": "card",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The card has been updated",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "404": {
            "description": "The card with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "tags": [
          "card"
        ],
        "summary": "Delete one card by ID",
        "operationId": "deleteCard",
        "responses": {
          "200": {
            "description": "The card with the specified ID has been deleted.",
            "schema": {
              "$ref": "#/definitions/DeletedEntity"
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "404": {
            "description": "The card with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "parameters": [
        {
          "type": "string",
          "name": "id",
          "in": "path",
          "required": true
        }
      ]
    },
    "/v0/login": {
      "post": {
        "security": [],
        "tags": [
          "login"
        ],
        "summary": "Login by using username and password",
        "operationId": "login",
        "parameters": [
          {
            "name": "LoginForm",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/LoginForm"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Login successful.",
            "schema": {
              "$ref": "#/definitions/Token"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/registration": {
      "post": {
        "security": [],
        "tags": [
          "registration"
        ],
        "summary": "Registration by using email, username, password",
        "operationId": "registration",
        "parameters": [
          {
            "name": "RegistrationForm",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/RegistrationForm"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Registration successful"
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/user": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Receiving the user by token",
        "operationId": "getUserByToken",
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/users": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Receiving all users",
        "operationId": "getUsers",
        "responses": {
          "200": {
            "description": "Receiving all users",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/users/{id}": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Receiving the user by ID",
        "operationId": "getUser",
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "tags": [
          "user"
        ],
        "summary": "Update the user by ID",
        "operationId": "updateUser",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Update success",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "tags": [
          "user"
        ],
        "summary": "Delete the user by ID",
        "operationId": "deleteUser",
        "responses": {
          "200": {
            "description": "The user with the specified ID has been deleted",
            "schema": {
              "$ref": "#/definitions/DeletedEntity"
            }
          },
          "401": {
            "$ref": "#/responses/UnauthorizedError"
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "parameters": [
        {
          "type": "string",
          "name": "id",
          "in": "path",
          "required": true
        }
      ]
    }
  },
  "definitions": {
    "Card": {
      "type": "object",
      "properties": {
        "class": {
          "type": "string"
        },
        "damage": {
          "type": "number"
        },
        "effects": {
          "type": "object"
        },
        "hp": {
          "type": "number"
        },
        "id": {
          "type": "string"
        },
        "image": {
          "type": "string"
        },
        "manaCost": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "skills": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "surName": {
          "type": "string"
        }
      }
    },
    "CreatedEntity": {
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "DeletedEntity": {
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "Error": {
      "type": "object",
      "required": [
        "message"
      ],
      "properties": {
        "code": {
          "type": "integer",
          "format": "int64"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "LoginForm": {
      "type": "object",
      "required": [
        "userName",
        "password"
      ],
      "properties": {
        "password": {
          "type": "string"
        },
        "userName": {
          "type": "string"
        }
      }
    },
    "RegistrationForm": {
      "type": "object",
      "required": [
        "email",
        "userName",
        "password"
      ],
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        },
        "password": {
          "type": "string"
        },
        "userName": {
          "type": "string",
          "maxLength": 16,
          "minLength": 3,
          "pattern": "^[A-Za-z0-9_]{3,16}$"
        }
      }
    },
    "Token": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        }
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "email": {
          "description": "The email of the User.",
          "type": "string"
        },
        "id": {
          "description": "The ID of the User.",
          "type": "string"
        },
        "totalGames": {
          "description": "Count of all games of the User.",
          "type": "integer"
        },
        "userName": {
          "description": "The user name.",
          "type": "string"
        },
        "winGames": {
          "description": "Count of all games where the User has won.",
          "type": "integer"
        }
      }
    }
  },
  "responses": {
    "UnauthorizedError": {
      "description": "Authentication information is missing or invalid",
      "headers": {
        "WWW_Authenticate": {
          "type": "string"
        }
      }
    }
  },
  "securityDefinitions": {
    "APIKeyHeader": {
      "type": "apiKey",
      "name": "JWT-Token",
      "in": "header"
    }
  },
  "security": [
    {
      "APIKeyHeader": []
    }
  ]
}`))
	FlatSwaggerJSON = json.RawMessage([]byte(`{
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "schemes": [
    "http"
  ],
  "swagger": "2.0",
  "info": {
    "description": "Description for API Server",
    "title": "IT-Stone Server",
    "version": "0.0.2"
  },
  "basePath": "/api",
  "paths": {
    "/v0/cards": {
      "get": {
        "tags": [
          "card"
        ],
        "summary": "Receiving all cards",
        "operationId": "getCards",
        "responses": {
          "200": {
            "description": "Cards array",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Card"
              }
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "tags": [
          "card"
        ],
        "summary": "Create a new card",
        "operationId": "createCard",
        "parameters": [
          {
            "name": "card",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/CreatedEntity"
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/cards/{id}": {
      "get": {
        "tags": [
          "card"
        ],
        "summary": "Receiving one card by ID",
        "operationId": "getCard",
        "responses": {
          "200": {
            "description": "Return a card with the specified ID",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "The card with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "tags": [
          "card"
        ],
        "summary": "Update one card by ID",
        "operationId": "updateCard",
        "parameters": [
          {
            "name": "card",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "The card has been updated",
            "schema": {
              "$ref": "#/definitions/Card"
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "The card with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "tags": [
          "card"
        ],
        "summary": "Delete one card by ID",
        "operationId": "deleteCard",
        "responses": {
          "200": {
            "description": "The card with the specified ID has been deleted.",
            "schema": {
              "$ref": "#/definitions/DeletedEntity"
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "The card with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "parameters": [
        {
          "type": "string",
          "name": "id",
          "in": "path",
          "required": true
        }
      ]
    },
    "/v0/login": {
      "post": {
        "security": [],
        "tags": [
          "login"
        ],
        "summary": "Login by using username and password",
        "operationId": "login",
        "parameters": [
          {
            "name": "LoginForm",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/LoginForm"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Login successful.",
            "schema": {
              "$ref": "#/definitions/Token"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/registration": {
      "post": {
        "security": [],
        "tags": [
          "registration"
        ],
        "summary": "Registration by using email, username, password",
        "operationId": "registration",
        "parameters": [
          {
            "name": "RegistrationForm",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/RegistrationForm"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Registration successful"
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/user": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Receiving the user by token",
        "operationId": "getUserByToken",
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/users": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Receiving all users",
        "operationId": "getUsers",
        "responses": {
          "200": {
            "description": "Receiving all users",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/User"
              }
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/v0/users/{id}": {
      "get": {
        "tags": [
          "user"
        ],
        "summary": "Receiving the user by ID",
        "operationId": "getUser",
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "post": {
        "tags": [
          "user"
        ],
        "summary": "Update the user by ID",
        "operationId": "updateUser",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Update success",
            "schema": {
              "$ref": "#/definitions/User"
            }
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "delete": {
        "tags": [
          "user"
        ],
        "summary": "Delete the user by ID",
        "operationId": "deleteUser",
        "responses": {
          "200": {
            "description": "The user with the specified ID has been deleted",
            "schema": {
              "$ref": "#/definitions/DeletedEntity"
            }
          },
          "401": {
            "description": "Authentication information is missing or invalid",
            "headers": {
              "WWW_Authenticate": {
                "type": "string"
              }
            }
          },
          "404": {
            "description": "The user with the specified ID was not found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          },
          "default": {
            "description": "Internal server error",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      },
      "parameters": [
        {
          "type": "string",
          "name": "id",
          "in": "path",
          "required": true
        }
      ]
    }
  },
  "definitions": {
    "Card": {
      "type": "object",
      "properties": {
        "class": {
          "type": "string"
        },
        "damage": {
          "type": "number"
        },
        "effects": {
          "type": "object"
        },
        "hp": {
          "type": "number"
        },
        "id": {
          "type": "string"
        },
        "image": {
          "type": "string"
        },
        "manaCost": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "skills": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "surName": {
          "type": "string"
        }
      }
    },
    "CreatedEntity": {
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "DeletedEntity": {
      "type": "object",
      "required": [
        "id"
      ],
      "properties": {
        "id": {
          "type": "string"
        }
      }
    },
    "Error": {
      "type": "object",
      "required": [
        "message"
      ],
      "properties": {
        "code": {
          "type": "integer",
          "format": "int64"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "LoginForm": {
      "type": "object",
      "required": [
        "userName",
        "password"
      ],
      "properties": {
        "password": {
          "type": "string"
        },
        "userName": {
          "type": "string"
        }
      }
    },
    "RegistrationForm": {
      "type": "object",
      "required": [
        "email",
        "userName",
        "password"
      ],
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        },
        "password": {
          "type": "string"
        },
        "userName": {
          "type": "string",
          "maxLength": 16,
          "minLength": 3,
          "pattern": "^[A-Za-z0-9_]{3,16}$"
        }
      }
    },
    "Token": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        }
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "email": {
          "description": "The email of the User.",
          "type": "string"
        },
        "id": {
          "description": "The ID of the User.",
          "type": "string"
        },
        "totalGames": {
          "description": "Count of all games of the User.",
          "type": "integer"
        },
        "userName": {
          "description": "The user name.",
          "type": "string"
        },
        "winGames": {
          "description": "Count of all games where the User has won.",
          "type": "integer"
        }
      }
    }
  },
  "responses": {
    "UnauthorizedError": {
      "description": "Authentication information is missing or invalid",
      "headers": {
        "WWW_Authenticate": {
          "type": "string"
        }
      }
    }
  },
  "securityDefinitions": {
    "APIKeyHeader": {
      "type": "apiKey",
      "name": "JWT-Token",
      "in": "header"
    }
  },
  "security": [
    {
      "APIKeyHeader": []
    }
  ]
}`))
}
