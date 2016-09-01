package daos

import (
	"errors"
	"log"
	"models"
	"time"
	"utils"

	"gopkg.in/mgo.v2/bson"
)

type StoryDao struct {
	BaseDao
}

func NewStoryDao(dataSource DataSource) *StoryDao {
	dao := StoryDao{BaseDao: *NewBaseDao(dataSource)}
	return &dao
}

func (dao *StoryDao) CreateStory(story *models.Story) error {
	story.Id_ = bson.NewObjectId()
	story.CreateAt = int32(time.Now().Unix())
	uuid, err := utils.NewUUIDV4()
	if err != nil {
		log.Println(err)
		return err
	}
	story.Sid = uuid.String()
	table := dao.GetTable("stories")
	err = table.Insert(story)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil

}

func (dao *StoryDao) FindStoryById(sid string) (*models.Story, error) {
	table := dao.GetTable("stories")
	result := models.Story{}
	err := table.Find(bson.M{"sid": sid}).One(&result)
	if err != nil {
		log.Printf("story [sid=%s] not found! - %s\n", sid, err.Error())
		return nil, err
	}
	return &result, nil
}

func (dao *StoryDao) FindRecentStories() ([]models.Story, error) {
	table := dao.GetTable("stories")
	result := []models.Story{}
	err := table.Find(nil).Sort("-$natural").Limit(25).All(&result)
	if err != nil {
		log.Printf("Can not found recent stories - %s\n", err.Error())
		return nil, err
	}
	return result, nil
}

func (dao *StoryDao) FindStoriesByUser(uid string, name string) ([]models.Story, error) {
	table := dao.GetTable("stories")
	result := []models.Story{}
	err := table.Find(bson.M{
		"$or": []bson.M{
			bson.M{"author.id": uid},
			bson.M{"author.name": name},
		},
	}).All(&result)

	if err != nil {
		log.Printf("Cannot find user's stories [uid=%s || name=%s] - %s\n", uid, name, err.Error())
		return nil, err
	}

	return result, nil
}

func (dao *StoryDao) UpdateStory(story *models.Story) error {
	table := dao.GetTable("stories")
	dbStory, err := dao.FindStoryById(story.Sid)
	if err != nil {
		log.Printf("story [sid=%s] not found! - %s\n", story.Sid, err.Error())
		return errors.New("Cannot found story")
	}
	if story.ParentId != "" {
		dbStory.ParentId = story.ParentId
	}
	if story.Author.Uid != "" {
		dbStory.Author.Uid = story.Author.Uid
	}
	if story.Author.Name != "" {
		dbStory.Author.Name = story.Author.Name
	}
	if story.Author.Type != -1 {
		dbStory.Author.Type = story.Author.Type
	}
	if story.Author.WxOpenId != "" && story.Author.Type == 0 {
		dbStory.Author.WxOpenId = story.Author.WxOpenId
	}
	if story.Author.WbOpenId != "" && story.Author.Type == 1 {
		dbStory.Author.WbOpenId = story.Author.WbOpenId
	}
	if story.Author.Avatar != "" {
		dbStory.Author.Avatar = story.Author.Avatar
	}

	if story.Title != "" {
		dbStory.Title = story.Title
	}
	if story.Space != 0 {
		dbStory.Space = story.Space
	}
	if story.Content != "" {
		dbStory.Content = story.Content
	}
	if len(story.Nodes) > 0 {
		dbStory.Nodes = append(dbStory.Nodes, story.Nodes...)
	}
	if story.Likes > 0 {
		dbStory.Likes = story.Likes
	}
	if len(story.LikeUsers) > 0 {
		dbStory.LikeUsers = append(dbStory.LikeUsers, story.LikeUsers...)
	}
	if len(story.ChildrenIds) > 0 {
		dbStory.ChildrenIds = append(dbStory.ChildrenIds, story.ChildrenIds...)
	}
	err = table.Update(bson.M{"sid": story.Sid}, dbStory)
	if err != nil {
		return err
	}

	return nil

}

func (dao *StoryDao) DeleteStoriesById(sid string) error {
	story, err := dao.FindStoryById(sid)
	if story == nil || err != nil {
		return err
	}
	table := dao.GetTable("stories")

	err = table.Remove(bson.M{"sid": sid})
	if err != nil {
		log.Printf("delete story [sid=%s] failed! - %s\n", sid, err.Error())
		return err
	}

	log.Printf("delete story [sid=%s] successfully!\n", sid)
	return nil
}
