package main

import (
	"fmt"
	"handlers"
	"log"
	"net/http"
	"routes"
	"time"

	"github.com/StephanDollberg/go-json-rest-middleware-jwt"
	"github.com/ant0ine/go-json-rest/rest"
)

func makeRouter() ([]*rest.Route, error) {
	var appRouters []*rest.Route
	for _, router := range routes.Routers {
		for _, handler := range router.Handlers {
			switch handler.Method {
			case "POST":
				appRouters = append(appRouters,
					rest.Post(router.Path, handler.HandlerFunc))
			case "GET":
				appRouters = append(appRouters,
					rest.Get(router.Path, handler.HandlerFunc))
			case "DELETE":
				appRouters = append(appRouters,
					rest.Delete(router.Path, handler.HandlerFunc))
			case "OPTIONS":
				appRouters = append(appRouters,
					rest.Delete(router.Path, handler.HandlerFunc))
			case "PUT":
				appRouters = append(appRouters,
					rest.Put(router.Path, handler.HandlerFunc))
			case "PATCH":
				appRouters = append(appRouters,
					rest.Patch(router.Path, handler.HandlerFunc))
			case "HTTP":
				http.HandleFunc(router.Path, handler.HttpHandlerFunc)
			}
		}
	}
	return appRouters, nil
}

func BootServer(host string, port string) error {

	sessionHandler := handlers.NewSessionHandler()

	jwt_middleware := &jwt.JWTMiddleware{
		Key:        []byte("secret key"),
		Realm:      "jwt auth",
		Timeout:    time.Hour,
		MaxRefresh: time.Hour * 24,
		Authenticator: func(username string, password string) bool {
			return sessionHandler.Authenticate(username, password)
		}}

	api := rest.NewApi()
	api.Use(rest.DefaultDevStack...)
	api.Use(&rest.IfMiddleware{
		Condition: func(request *rest.Request) bool {
			return false
		},
		IfTrue: jwt_middleware,
	})

	appRouters, err := makeRouter()
	if err != nil {
		log.Fatal(err)
		return err
	}

	app, err := rest.MakeRouter(appRouters...)
	if err != nil {
		log.Fatal(err)
		return err
	}

	api.SetApp(app)

	log.Printf("ChainStory API Server is listening on [%s:%s]...", host, port)
	fmt.Printf("ChainStory API Server is listening on [%s:%s]...\n", host, port)
	err = http.ListenAndServe(host+":"+port, api.MakeHandler())
	if err != nil {
		fmt.Printf("Listen on [%s:%s] error [%s]\n", host, port, err)
		log.Fatalf("Listen on [%s:%s] error [%s]", host, port, err)
		return err
	}
	return nil
}
