package models

import "gopkg.in/mgo.v2/bson"

type Story struct {
	Id_         bson.ObjectId `json:"-", bson:"_id"`
	Sid         string        `json:"sid", bson:"sid"`
	ParentId    string        `json:"parent_id", bson:"parent_id"`
	Author      User          `json:"author", bson:"author"`
	Title       string        `json:"title", bson:"title"`
	Space       int           `json:"space", bson:"space"`
	Content     string        `json:"content", bson:"content"`
	Nodes       []*Story      `json:"nodes", bson:"nodes"`
	Likes       int           `json:"likes", bson:"likes"`
	LikeStaus   bool          `json:"like_status", bson:"-"`
	LikeUsers   []string      `json:"-", bson:"like_users"`
	ChildrenIds []string      `json:"child_node_ids", bson:"child_node_ids"`
	CreateAt    int32         `json:"create_at", bson:"create_at"`
}