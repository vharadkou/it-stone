package domain

//UserInfo - free user's information from Google
type UserInfo struct {
	Sub        string `json:"sub"`
	Name       string `json:"name"`
	GivenName  string `json:"given_name"`
	FamilyName string `json:"family_name"`
	Email      string `json:"email"`
}

//NewUserInfo - return pointer on userInfo struct
func NewUserInfo() *UserInfo {
	return &UserInfo{}
}
