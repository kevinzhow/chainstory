package daos

import (
	"log"

	mgo "gopkg.in/mgo.v2"
)

type DataSource int

const (
	MongoDB DataSource = iota
)

type BaseDao struct {
	client *mgo.Session
	db     *mgo.Database
}

// Constructor
func NewBaseDao(dataSource DataSource) *BaseDao {
	dao := new(BaseDao)
	if dataSource == MongoDB {
		dao.client = getMongoDBClient()
		dao.db = dao.client.DB("ChainStory")
	}
	return dao
}

func getMongoDBClient() *mgo.Session {
	//get MongoDB client connection
	session, err := mgo.Dial("localhost")
	if err != nil {
		log.Fatal(err)
	}
	return session

}

func (dao *BaseDao) GetClient() *mgo.Session {
	return dao.client
}
func (dao *BaseDao) GetDB() *mgo.Database {
	return dao.db
}
func (dao *BaseDao) GetTable(name string) *mgo.Collection {
	return dao.db.C(name)
}
