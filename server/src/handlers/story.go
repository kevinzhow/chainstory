package handlers

import (
	"log"
	"models"
	"net/http"
	"services"

	"github.com/ant0ine/go-json-rest/rest"
)

type StoryHandler struct {
	storyService *services.StoryService
	userService  *services.UserService
}

func NewStoryHandler() *StoryHandler {
	handler := new(StoryHandler)
	handler.storyService = services.NewStoryService()
	handler.userService = services.NewUserService()
	return handler
}

func (handler *StoryHandler) CreateStory(w rest.ResponseWriter, req *rest.Request) {
	var story = models.Story{}
	err := req.DecodeJsonPayload(&story)
	if err != nil {
		log.Println(err)
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	if story.Title == "" || story.Author.Uid == "" || len(story.Content) < 20 {
		log.Println("Empty Fields", story)
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	log.Printf("Recieved data from client [%+v]\n", story)

	err = handler.storyService.CreateStory(&story)
	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
	} else {
		response["status"] = "OK"
		response["message"] = "Create Story Successfully"
		response["sid"] = story.Sid
		response["title"] = story.Title
	}
	w.WriteJson(response)

}

func (handler *StoryHandler) FindStoryById(w rest.ResponseWriter, req *rest.Request) {
	sid := req.PathParam("sid")
	if sid == "" {
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	story, err := handler.storyService.FindStoryById(sid)
	if story == nil && err != nil {
		response := MakeResponse()
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	w.WriteJson(story)
}

func (handler *StoryHandler) FindStoriesByUser(w rest.ResponseWriter, req *rest.Request) {
	uid := req.PathParam("uid")
	name := req.PathParam("name")
	if uid == "" || name == "" {
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	stories, err := handler.storyService.FindStoriesByUser(uid, name)
	if stories == nil && err != nil {
		response := MakeResponse()
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	w.WriteJson(stories)
}

func (handler *StoryHandler) DeleteStoriesByUser(w rest.ResponseWriter, req *rest.Request) {
	uid := req.PathParam("uid")
	name := req.PathParam("name")
	if uid == "" && name == "" {
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}

	err := handler.storyService.DeleteStoriesByUser(uid, name)

	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	response["status"] = "OK"
	if uid != "" {
		response["message"] = "Delete user stories [uid=" + uid + "] sucessfully!"
	} else {
		response["message"] = "Delete user stories [name=" + name + "]sucessfully!"
	}
	w.WriteJson(response)
}

func (handler *StoryHandler) DeleteStoriesById(w rest.ResponseWriter, req *rest.Request) {
	sid := req.PathParam("sid")
	if sid == "" {
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}

	err := handler.storyService.DeleteStoriesById(sid)

	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	response["status"] = "OK"
	response["message"] = "Delete stories [sid=" + sid + "] sucessfully!"
	w.WriteJson(response)
}
