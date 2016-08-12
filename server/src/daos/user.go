package daos

import (
	"log"
	"models"

	"gopkg.in/mgo.v2/bson"
)

type UserDao struct {
	BaseDao
}

func NewUserDao(dataSource DataSource) *UserDao {
	dao := UserDao{BaseDao: *NewBaseDao(dataSource)}
	return &dao
}

func (dao *UserDao) CreateUser(user models.User) bool {
	table := dao.GetTable("users")
	err := table.Insert(user)
	if err != nil {
		log.Println(err)
		return false
	}
	return true
}

func (dao *UserDao) FindUserById(id string) *models.User {
	table := dao.GetTable("users")
	result := models.User{}
	err := table.Find(bson.M{"uid": id}).One(&result)
	if err != nil {
		log.Println("user [%s] not found", id)
		return nil
	}
	return &result
}

func (dao *UserDao) FindUserByName(name string) *models.User {
	table := dao.GetTable("users")
	result := models.User{}
	err := table.Find(bson.M{"nick_name": name}).One(&result)
	if err != nil {
		log.Println("user [%s] not found", name)
		return nil
	}
	return &result
}
