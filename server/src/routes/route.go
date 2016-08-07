package routes

import "handlers"

var storyHandler = handlers.NewStoryHandler()

var Routers = []RouteMap{
	{
		Path: "/",
		Handlers: []RestHandler{
			{
				Method:          "HTTP",
				HttpHandlerFunc: handlers.IndexGET,
			},
		},
	},

	{
		Path: "/hello",
		Handlers: []RestHandler{
			{
				Method:      "GET",
				HandlerFunc: handlers.HelloGET,
			},
		},
	},
}
