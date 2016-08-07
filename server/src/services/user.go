package services

import (
	"daos"
	"models"
)

type UserService struct {
	userDao *daos.UserDao
}

func NewUserService() *UserService {
	service := new(UserService)
	service.userDao = daos.NewUserDao(daos.MongoDB)
	return service
}

func (service *UserService) RegisterUser(user models.User) (string, error) {
	return service.userDao.CreateUser(user)
}

func (service *UserService) AuthUser(username string, password string) (bool, error) {
	users, err := service.userDao.FindUserByName(username)
	if users == nil || err != nil {
		return false, err
	}
	return true, nil
}
