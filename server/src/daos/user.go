package daos

import (
	"errors"
	"log"
	"models"
	"time"
	"utils"

	"gopkg.in/mgo.v2/bson"
)

type UserDao struct {
	BaseDao
}

func NewUserDao(dataSource DataSource) *UserDao {
	dao := UserDao{BaseDao: *NewBaseDao(dataSource)}
	return &dao
}

func (dao *UserDao) CreateUser(user *models.User) error {
	user.Id_ = bson.NewObjectId()
	user.CreateAt = int32(time.Now().Unix())
	uuid, err := utils.NewUUIDV4()
	if err != nil {
		log.Println(err)
		return err
	}
	user.Uid = uuid.String()
	table := dao.GetTable("users")
	err = table.Insert(user)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}


// Find user by ID

func (dao *UserDao) FindUserById(id string) (*models.User, error) {
	table := dao.GetTable("users")
	result := models.User{}
	err := table.Find(bson.M{"uid": id}).One(&result)
	if err != nil {
		log.Printf("user [uid=%s] not found! - %s\n", id, err.Error())
		return nil, errors.New("Cannot found user")
	}
	return &result, nil
}

// Find user by name

func (dao *UserDao) FindUserByName(name string) (*models.User, error) {
	table := dao.GetTable("users")
	result := models.User{}
	err := table.Find(bson.M{"name": name}).One(&result)
	if err != nil {
		log.Println("user [name=", name, "] not found!", err.Error())
		return nil, errors.New("Cannot found user")
	}
	return &result, nil
}

// Find user by wx open ID

func (dao *UserDao) FindUserByWXOpenID(wx_openID string) (*models.User, error) {
	table := dao.GetTable("users")
	result := models.User{}
	err := table.Find(bson.M{"wx_openid": wx_openID}).One(&result)
	if err != nil {
		log.Println("user [wx_openid=", wx_openID, "] not found!", err.Error())
		return nil, errors.New("Cannot found user")
	}
	return &result, nil
}

// Find user by wb open ID

func (dao *UserDao) FindUserByWBOpenID(wb_openID string) (*models.User, error) {
	table := dao.GetTable("users")
	result := models.User{}
	err := table.Find(bson.M{"wb_openid": wb_openID}).One(&result)
	if err != nil {
		log.Println("user [wb_openid=", wb_openID, "] not found!", err.Error())
		return nil, errors.New("Cannot found user")
	}
	return &result, nil
}

func (dao *UserDao) DeleteUserByName(name string) error {
	_, err := dao.FindUserByName(name)
	if err != nil {
		return err
	}
	table := dao.GetTable("users")
	err = table.Remove(bson.M{"name": name})
	if err != nil {
		log.Printf("delete user [name=%s] failed! - %s\n", name, err.Error())
		return err
	}

	log.Printf("delete user [name=%s] successfully!\n", name)
	return nil
}

func (dao *UserDao) DeleteUserById(uid string) error {
	_, err := dao.FindUserById(uid)
	if err != nil {
		return err
	}
	table := dao.GetTable("users")
	err = table.Remove(bson.M{"uid": uid})
	if err != nil {
		log.Println("delete user [uid=", uid, "] failed!", err.Error())
		return err
	}

	log.Println("delete user [uid=", uid, "] successfully!")
	return nil
}
