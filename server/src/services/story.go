package services

import (
	"daos"
	"models"
)

type StoryService struct {
	storyDao *daos.StoryDao
}

func NewStoryService() *StoryService {
	service := new(StoryService)
	service.storyDao = daos.NewStoryDao(daos.MongoDB)
	return service
}

func (service *StoryService) NewStory(story models.Story) (bool, error) {
	return true, nil
}

func (service *StoryService) DeleteStory(story models.Story) (bool, error) {
	return true, nil
}
