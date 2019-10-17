package helpers

type UserSearchHelper interface {
	SearchByEmail() string
	SearchByUsername() string
}

type userSearchHelper struct{}

func NewUserSearchHelper() UserSearchHelper {
	return &userSearchHelper{}
}

func (us userSearchHelper) SearchByEmail() string {
	return "email"
}

func (us userSearchHelper) SearchByUsername() string {
	return "userName"
}
