package search

type UserSearcher interface {
	SearchByEmail() string
	SearchByUsername() string
}

type userSearcher struct{}

func NewUserSearcher() UserSearcher {
	return &userSearcher{}
}

func (us userSearcher) SearchByEmail() string {
	return "Email"
}

func (us userSearcher) SearchByUsername() string {
	return "UserName"
}
