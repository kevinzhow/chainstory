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

func (service *UserService) RegisterUser(user models.User) bool {
	return service.userDao.CreateUser(user)
}

func (service *UserService) FindUserById(id string) *models.User {
	return service.userDao.FindUserById(id)
}
func (service *UserService) FindUserByName(id string) *models.User {
	return service.userDao.FindUserByName(id)
}

func (service *UserService) AuthUser(username string, password string) bool {
	users := service.userDao.FindUserByName(username)
	return !(users == nil)
}
