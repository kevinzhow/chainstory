package services

import (
	"daos"
	"errors"
	"log"
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

func (service *UserService) CreateUser(user *models.User) error {
	u, err := service.FindUserByName(user.Name)
	if err == nil && u != nil {
		log.Printf("Duplicated Username - [%s]\n", user.Name)
		return errors.New("Duplicated Username")
	}
	return service.userDao.CreateUser(user)
}

func (service *UserService) FindUserById(id string) (*models.User, error) {
	return service.userDao.FindUserById(id)
}
func (service *UserService) FindUserByName(name string) (*models.User, error) {
	return service.userDao.FindUserByName(name)
}
func (service *UserService) DeleteUserById(id string) error {
	return service.userDao.DeleteUserById(id)
}
func (service *UserService) DeleteUserByName(name string) error {
	return service.userDao.DeleteUserByName(name)
}

func (service *UserService) AuthUser(username string, password string) bool {
	//users := service.userDao.FindUserByName(username)
	//return !(users == nil)
	//return errors.New("Unused method!")
	return true
}
