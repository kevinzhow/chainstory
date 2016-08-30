package models

import "gopkg.in/mgo.v2/bson"

type User struct {
	Id_              bson.ObjectId `json:"-" bson:"_id"`
	Uid              string        `json:"uid" bson:"uid"`
	AccessToken      string        `json:"access_token" bson:"access_token"`
	Name     		 string        `json:"name" bson:"name"`
	Type     		 int           `json:"type" bson:"type"` //0 means WeChat, 1 means Weibo
	WxOpenId 		 string        `json:"wx_openid" bson:"wx_openid"`
	WbOpenId 		 string        `json:"wb_openid" bson:"wb_openid"`
	Avatar   		 string        `json:"avatar" bson:"avatar"`
	CreateAt 		 int32         `json:"create_at" bson:"create_at"`
}
