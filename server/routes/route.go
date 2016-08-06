package routes

import (
  "net/http"
  "../controllers"
)

func init()  {
  http.HandleFunc("/", controllers.IndexGET)
  http.HandleFunc("/hello", controllers.HelloGET)
}
