package services

import (
	"daos"
	"errors"
	"log"
	"models"
)

type StoryService struct {
	storyDao *daos.StoryDao
	userDao  *daos.UserDao
}

func NewStoryService() *StoryService {
	service := new(StoryService)
	service.storyDao = daos.NewStoryDao(daos.MongoDB)
	service.userDao = daos.NewUserDao(daos.MongoDB)
	return service
}

func (service *StoryService) CreateStory(story *models.Story) error {
	u, err := service.userDao.FindUserById(story.Author.Uid)
	if err != nil {
		log.Printf("Cannot find the user [uid=%s] - %s\n", story.Author.Uid, err.Error())
		return errors.New("Invalid User!")
	}
	story.Author = *u
	if story.ParentId != "" {
		parentStory, err := service.FindStoryById(story.ParentId)
		if err == nil {
			parentStoryNode := models.StoryNode{}
			parentStoryNode.Author = parentStory.Author
			parentStoryNode.Title = parentStory.Title
			parentStoryNode.Sid = parentStory.Sid
			parentStoryNode.Space = parentStory.Space
			parentStoryNode.Content = parentStory.Content
			parentStoryNode.CreateAt = parentStory.CreateAt
			parentStoryNode.Card = parentStory.Card
			story.Nodes = append(parentStory.Nodes, &parentStoryNode)
			story.Space = parentStory.Space + 1
		}
	}
	err = service.storyDao.CreateStory(story)
	if err != nil {
		return err
	}

	//update parent's children
	if story.ParentId != "" {
		var s = models.Story{}
		s.Author.Type = -1
		s.Sid = story.ParentId
		s.ChildrenIds = []string{story.Sid}
		err := service.storyDao.UpdateStory(&s)
		if err != nil {
			log.Printf("Update Parent's[sid=%s] children[%+v] failed! - %s \n", s.Sid, s.Nodes, err.Error())
			return err
		}
	}
	return nil

}

func (service *StoryService) FindStoryById(sid string) (*models.Story, error) {
	return service.storyDao.FindStoryById(sid)
}

func (service *StoryService) FindRecentStories() ([]models.Story, error) {
	return service.storyDao.FindRecentStories()
}

func (service *StoryService) FindStoriesByUser(uid string, name string) ([]models.Story, error) {
	return service.storyDao.FindStoriesByUser(uid, name)
}

func (service *StoryService) FindStoriesBySid(sid string) ([]models.Story, error) {
	return service.storyDao.FindStoriesBySid(sid)
}

func (service *StoryService) DeleteStoriesById(sid string) error {
	log.Printf("Deleting story [sid=%s]...", sid)

	story, err := service.FindStoryById(sid)
	if err != nil {
		log.Printf("Cannot find story [sid=%s] - %s\n", sid, err.Error())
		return err
	}

	//delete current story
	err = service.storyDao.DeleteStoriesById(sid)
	if err != nil {
		log.Printf("Delete story [sid=%d] failed! - %s\n", sid, err.Error())
	} else {
		log.Printf("Delete story [sid=%d] successfully!\n", sid)
	}
	return err

	//recursively delete story's childrens
	for i := 0; i < len(story.ChildrenIds); i++ {
		service.DeleteStoriesById(story.ChildrenIds[i])
	}
	return nil
}

func (service *StoryService) DeleteStoriesByUser(uid string, name string) error {

	log.Printf("Deleting user's stories [uid=%s || name =%s]...", uid, name)

	stories, err := service.FindStoriesByUser(uid, name)
	if err != nil {
		return err
	}
	for i := 0; i < len(stories); i++ {
		service.DeleteStoriesById(stories[i].Sid)
	}
	return nil
}
