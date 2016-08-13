package routes

import "handlers"

var userHandler = handlers.NewUserHandler()
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

	{
		Path: "/user",
		Handlers: []RestHandler{
			{
				Method:      "POST",
				HandlerFunc: userHandler.CreateUser,
			},
		},
	},

	{
		Path: "/user/id/:uid",
		Handlers: []RestHandler{
			{
				Method:      "GET",
				HandlerFunc: userHandler.FindUser,
			},
		},
	},

	{
		Path: "/user/name/:name",
		Handlers: []RestHandler{
			{
				Method:      "GET",
				HandlerFunc: userHandler.FindUser,
			},
		},
	},

	{
		Path: "/user/id/:uid",
		Handlers: []RestHandler{
			{
				Method:      "DELETE",
				HandlerFunc: userHandler.DeleteUser,
			},
		},
	},

	{
		Path: "/user/name/:name",
		Handlers: []RestHandler{
			{
				Method:      "DELETE",
				HandlerFunc: userHandler.DeleteUser,
			},
		},
	},
}
