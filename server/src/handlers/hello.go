package handlers

import "github.com/ant0ine/go-json-rest/rest"

// Return the Hello World for fun
func HelloGET(w rest.ResponseWriter, r *rest.Request) {
	response := MakeResponse()
	response["message"] = "Hello, World"
	w.WriteJson(response)
}