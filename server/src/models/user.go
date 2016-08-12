package models

import "gopkg.in/mgo.v2/bson"

type User struct {
	Id_      bson.ObjectId `bson:"_id"`
	Uid      string        `bson:"uid"`
	NickName string        `bson:"nick_name"`
	Type     int           `bson:"type"` //0 means WeChat, 1 means Weibo
	WxOpenId string        `bson:"wx_openid"`
	WbOpenId string        `bson:"wb_openid"`
	Avatar   string        `bson:"avatar"`
	CreateAt int           `bson:"create_at"`
}
