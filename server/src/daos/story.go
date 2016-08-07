package daos

type StoryDao struct {
	BaseDao
}

func NewStoryDao(dataSource DataSource) *StoryDao {
	dao := StoryDao{BaseDao: NewBaseDao(dataSource)}
	return &dao
}
