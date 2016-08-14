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
	log.Print("Recieved data from client [%+v]\n", user)
	if err != nil || user.Name == "" {
		log.Println(err)
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	err = handler.service.CreateUser(&user)
	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
	} else {
		response["status"] = "OK"
		response["message"] = "Create User Successfully"
		response["uid"] = user.Uid
		response["name"] = user.Name

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

//Delete user
func (handler *UserHandler) DeleteUser(w rest.ResponseWriter, req *rest.Request) {
	uid := req.PathParam("uid")
	name := req.PathParam("name")
	if uid == "" && name == "" {
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}

	var err error

	if uid != "" {
		err = handler.service.DeleteUserById(uid)
	} else {
		err = handler.service.DeleteUserByName(name)
	}
	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	response["status"] = "OK"
	if uid != "" {
		response["message"] = "Delete user [uid=" + uid + "] sucessfully!"
	} else {
		response["message"] = "Delete user [name=" + name + "]sucessfully!"
	}
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