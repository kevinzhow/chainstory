package routes

import (
	"net/http"

	"github.com/ant0ine/go-json-rest/rest"
)

type RestHandler struct {
	Method          string
	HandlerFunc     rest.HandlerFunc
	HttpHandlerFunc func(http.ResponseWriter, *http.Request)
}

type RouteMap struct {
	Path     string
	Handlers []RestHandler
}
