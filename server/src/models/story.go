package models

import "gopkg.in/mgo.v2/bson"

type Story struct {
	Id_         bson.ObjectId `bson:"_id"`
	Id          string        `bson:"id"`
	Author      string        `bson:"author"`
	Title       string        `bson:"title"`
	Space       string        `bson:"space"`
	Content     string        `bson:"content"`
	Likes       int           `bson:"likes"`
	LikeUsers   []string      `bson:"like_users"`
	ParentIds   []string      `bson:"parent_node_ids"`
	ChildrenIds []string      `bson:"child_node_ids"`
	CreateAt    int           `bson:"create_at"`
}
