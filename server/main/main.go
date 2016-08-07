package main

import (
	"fmt"
	"net/http"
	//_ "routes"
)

func main() {
	fmt.Printf("Server Started on localhost:3000\n")
	http.ListenAndServe(":3000", nil)
}
