package routes

import "handlers"

var userHandler = handlers.NewUserHandler()
var storyHandler = handlers.NewStoryHandler()

var Routers = []RouteMap{

	// ============== HTTP Web Page =============
	{
		Path: "/",
		Handlers: []RestHandler{{
			Method:          "HTTP",
			HttpHandlerFunc: handlers.IndexGET,
		}},
	},

	// ============== Dummy Restful API =============
	{
		Path: "/hello",
		Handlers: []RestHandler{{
			Method:      "GET",
			HandlerFunc: handlers.HelloGET,
		}},
	},

	// ============== User Restful API =============
	{
		Path: "/user",
		Handlers: []RestHandler{{
			Method:      "POST",
			HandlerFunc: userHandler.CreateUser,
		}},
	},

	{
		Path: "/user/id/:uid",
		Handlers: []RestHandler{{
			Method:      "GET",
			HandlerFunc: userHandler.FindUser,
		}},
	},

	{
		Path: "/user/name/:name",
		Handlers: []RestHandler{{
			Method:      "GET",
			HandlerFunc: userHandler.FindUser,
		}},
	},
	
	{
		Path: "/user/wx_openid/:wx_openid",
		Handlers: []RestHandler{{
			Method:      "GET",
			HandlerFunc: userHandler.FindUser,
		}},
	},

	{
		Path: "/user/id/:uid",
		Handlers: []RestHandler{{
			Method:      "DELETE",
			HandlerFunc: userHandler.DeleteUser,
		}},
	},

	{
		Path: "/user/name/:name",
		Handlers: []RestHandler{{
			Method:      "DELETE",
			HandlerFunc: userHandler.DeleteUser,
		}},
	},

	// ============== Story Restful API =============
	{
		Path: "/story",
		Handlers: []RestHandler{{
			Method:      "POST",
			HandlerFunc: storyHandler.CreateStory,
		}},
	},

	{
		Path: "/story/:sid",
		Handlers: []RestHandler{{
			Method:      "GET",
			HandlerFunc: storyHandler.FindStoryById,
		}},
	},

	{
		Path: "/story/user/id/:uid",
		Handlers: []RestHandler{{
			Method:      "GET",
			HandlerFunc: storyHandler.FindStoriesByUser,
		}},
	},

	{
		Path: "/story/user/name/:name",
		Handlers: []RestHandler{{
			Method:      "GET",
			HandlerFunc: storyHandler.FindStoriesByUser,
		}},
	},

	{
		Path: "/story/id/:sid",
		Handlers: []RestHandler{{
			Method:      "DELETE",
			HandlerFunc: storyHandler.DeleteStoriesById,
		}},
	},

	{
		Path: "/story/user/name/:name",
		Handlers: []RestHandler{{
			Method:      "DELETE",
			HandlerFunc: storyHandler.DeleteStoriesByUser,
		}},
	},

	{
		Path: "/story/user/id/:uid",
		Handlers: []RestHandler{{
			Method:      "DELETE",
			HandlerFunc: storyHandler.DeleteStoriesByUser,
		}},
	},
}
