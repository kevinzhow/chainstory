package routes

import (
	"controllers"
	"net/http"
)

func init() {
	http.HandleFunc("/", controllers.IndexGET)
	http.HandleFunc("/hello", controllers.HelloGET)
}
