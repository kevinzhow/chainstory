package handlers

import (
	"log"
	"models"
	"net/http"
	"services"

	"github.com/ant0ine/go-json-rest/rest"
)

type UserHandler struct {
	service *services.UserService
}

// Constructor
func NewUserHandler() *UserHandler {
	handler := new(UserHandler)
	handler.service = services.NewUserService()
	return handler
}

// Create a user
func (handler *UserHandler) CreateUser(w rest.ResponseWriter, req *rest.Request) {
	var user = models.User{}
	err := req.DecodeJsonPayload(&user)
	log.Println(user)
	if err != nil || user.Name == "" {
		log.Println(err)
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	err = handler.service.CreateUser(user)
	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
	} else {
		response["status"] = "OK"
		response["message"] = "Create User Successfully"

	}
	w.WriteJson(response)
}

// Get a user's profile
func (handler *UserHandler) FindUser(w rest.ResponseWriter, req *rest.Request) {
	uid := req.PathParam("uid")
	name := req.PathParam("name")
	//log.Println("uid -", uid, "name -", name)

	if uid == "" && name == "" {
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	var user *models.User
	var err error

	if uid != "" {
		user, err = handler.service.FindUserById(uid)
	} else {
		user, err = handler.service.FindUserByName(name)
	}

	if user == nil && err != nil {
		response := MakeResponse()
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	w.WriteJson(user)
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
