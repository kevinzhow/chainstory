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

func (service *UserService) CreateUser(user models.User) error {
	u, err := service.FindUserByName(user.Name)
	if err == nil && u != nil {
		log.Println("Duplicated Username - [%s]", user.Name)
		return errors.New("Duplicated Username")
	}
	return service.userDao.CreateUser(user)
}

func (service *UserService) FindUserById(id string) (*models.User, error) {
	return service.userDao.FindUserById(id)
}
func (service *UserService) FindUserByName(id string) (*models.User, error) {
	return service.userDao.FindUserByName(id)
}

func (service *UserService) AuthUser(username string, password string) bool {
	//users := service.userDao.FindUserByName(username)
	//return !(users == nil)
	//return errors.New("Unused method!")
	return true
}
