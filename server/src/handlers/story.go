package handlers

import (
	"daos"

	"github.com/ant0ine/go-json-rest/rest"
)

type StoryHandler struct {
	dao *daos.BaseDao
}

func NewStoryHandler() *StoryHandler {
	handler := new(StoryHandler)
	handler.dao = daos.NewBaseDao(daos.MongoDB)
	return handler
}

func (handler *StoryHandler) NewStory(w rest.ResponseWriter, req *rest.Request) {
	response := MakeResponse()
	response["status"] = "OK"
	w.WriteJson(response)
}

func (handler *StoryHandler) DeleteStory(w rest.ResponseWriter, req *rest.Request) {
	response := MakeResponse()
	response["status"] = "OK"
	w.WriteJson(response)
}
