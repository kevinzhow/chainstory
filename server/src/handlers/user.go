package handlers

import (
	"daos"
	"net/http"

	"github.com/ant0ine/go-json-rest/rest"
)

type UserHandler struct {
	dao *daos.BaseDao
}

// Constructor
func NewUserHandler() *UserHandler {
	handler := new(UserHandler)
	handler.dao = daos.NewBaseDao(daos.MongoDB)
	return handler
}

// Get a user's profile
func (handler *UserHandler) LoadUser(w rest.ResponseWriter, req *rest.Request) {
	id := req.PathParam("uid")
	if id == "" {
		rest.Error(w, "username is required", http.StatusBadRequest)
		return
	}

	response := MakeResponse()
	response["status"] = "OK"
	w.WriteJson(response)
}

func (handler *UserHandler) OAuthUser(w rest.ResponseWriter, req *rest.Request) {
	id := req.PathParam("uid")
	if id == "" {
		rest.Error(w, "username is required", http.StatusBadRequest)
		return
	}

	response := MakeResponse()
	response["status"] = "OK"
	w.WriteJson(response)
}
