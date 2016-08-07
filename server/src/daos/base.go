package daos

type DataSource int

const (
	MongoDB DataSource = iota
)

type BaseDao interface {
	//client MongoDB
}

// Constructor
func NewBaseDao(dataSource DataSource) *BaseDao {
	dao := new(BaseDao)
	if dataSource == MongoDB {
		//TODO
		//dao.client = getMongoDBClient()
	}
	return dao
}

func getMongoDBClient() {
	//TODO: get MongoDB client connection
}
