package handlers

import (
	"log"
	"services"
)

type SessionHandler struct {
	userService *services.UserService
}

// Constructor
func NewSessionHandler() *SessionHandler {
	handler := new(SessionHandler)
	handler.userService = services.NewUserService()
	return handler
}

// Authenticate an user by `username` and `password`
func (handler *SessionHandler) Authenticate(username string, password string) bool {
	if username == "" || password == "" {
		log.Println("Username and Password MUST be provided for authentication")
		return false
	}
	return handler.userService.AuthUser(username, password)
}
