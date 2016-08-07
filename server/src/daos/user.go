package daos

import "models"

type UserDao struct {
	BaseDao
}

func NewUserDao(dataSource DataSource) *UserDao {
	dao := UserDao{BaseDao: *NewBaseDao(dataSource)}
	return &dao
}

func (dao *UserDao) CreateUser(user models.User) (string, error) {
	return "", nil
}

func (dao *UserDao) FindUserById(id string) (*models.User, error) {
	return nil, nil
}

func (dao *UserDao) FindUserByName(id string) (*models.User, error) {
	return nil, nil
}
