package controllers

import (
  "net/http"
  "fmt"
)

// Display the Hello World page for fun
func HelloGET(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "Hello Go")
}
