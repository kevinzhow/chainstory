package handlers

import (
	"log"
	"models"
	"net/http"
	"services"
	"encoding/json"
  	"errors"
	"io/ioutil"
	"github.com/ant0ine/go-json-rest/rest"
)

type UserHandler struct {
	service *services.UserService
}

type AccessInfo struct {
    AccessToken string `json:"access_token"`
    Openid   string `json:"openid"`
}

type UserInfo struct {
    Openid string `json:"openid"`
    Nickname   string `json:"nickname"`
    Sex   int `json:"sex"`
    Province string `json:"province"`
    City string `json:"city"`
    Country string `json:"country"`
    Headimgurl string `json:"headimgurl"`
    Unionid string `json:"unionid"`
}
// Constructor
func NewUserHandler() *UserHandler {
	handler := new(UserHandler)
	handler.service = services.NewUserService()
	return handler
}
// Create a user
func (handler *UserHandler) CreateUser(w rest.ResponseWriter, req *rest.Request) {
	var user = models.User{}
	err := req.DecodeJsonPayload(&user)
	log.Printf("Recieved data from client [%+v]\n", user)
	if err != nil || user.Name == "" {
		log.Println(err)
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	err = handler.service.CreateUser(&user)
	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
	} else {
		response["status"] = "OK"
		response["message"] = "Create User Successfully"
		response["uid"] = user.Uid
		response["name"] = user.Name

	}
	w.WriteJson(response)
}

// Get a user's profile
func (handler *UserHandler) FindUser(w rest.ResponseWriter, req *rest.Request) {
	uid := req.PathParam("uid")
	name := req.PathParam("name")
	wx_openid := req.PathParam("wx_openid")
	//log.Println("uid -", uid, "name -", name)

	if uid == "" && name == "" && wx_openid == ""{
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}
	var user *models.User
	var err error

	if uid != "" {
		user, err = handler.service.FindUserById(uid)
	} else if name != "" {
		user, err = handler.service.FindUserByName(name)
	} else {
		user, err = handler.service.FindUserByWXOpenID(wx_openid)
	}

	if user == nil && err != nil {
		response := MakeResponse()
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	w.WriteJson(user)
}

//Delete user
func (handler *UserHandler) DeleteUser(w rest.ResponseWriter, req *rest.Request) {
	uid := req.PathParam("uid")
	name := req.PathParam("name")
	if uid == "" && name == "" {
		rest.Error(w, "Invalid Request!", http.StatusBadRequest)
		return
	}

	var err error

	if uid != "" {
		err = handler.service.DeleteUserById(uid)
	} else {
		err = handler.service.DeleteUserByName(name)
	}
	response := MakeResponse()
	if err != nil {
		response["status"] = "Error"
		response["message"] = err.Error()
		w.WriteJson(response)
		return
	}

	response["status"] = "OK"
	if uid != "" {
		response["message"] = "Delete user [uid=" + uid + "] sucessfully!"
	} else {
		response["message"] = "Delete user [name=" + name + "]sucessfully!"
	}
	w.WriteJson(response)
}

func (handler *UserHandler) OAuthUser(w rest.ResponseWriter, req *rest.Request) {
	id := req.PathParam("uid")
	if id == "" {
		rest.Error(w, "username is required", http.StatusBadRequest)
		return
	}

	response := MakeResponse()
	response["status"] = "OK"
	w.WriteJson(response)
}

func fetchOAuthWXUserInfo(access_token string, openid string) (userinfo UserInfo, fetchError error){

	resp, err := http.Get("https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openid+"&lang=zh_CN")
	if err != nil {
    	fetchError = errors.New("Parse Error")
	}
 
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
    	fetchError = errors.New("Parse Error")
    	return
    } 

    userinfoStr := string(body)
    err = json.Unmarshal([]byte(userinfoStr), &userinfo)
    log.Print(userinfoStr)

    if err != nil {
    	fetchError = errors.New("Parse Error")
    	return
    } 

    return

}

func fetchOAuthWXUser(code string) (accessInfo AccessInfo, fetchError error){

	resp, err := http.Get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx65c09df2657f16f7&secret=a0a219926e67d1eaa794caaef88b7220&code="+code+"&grant_type=authorization_code")
	if err != nil {
    	fetchError = errors.New("Parse Error")
	}
 
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)

    if err != nil {
    	fetchError = errors.New("Parse Error")
    	return
    } 

    accessInfoStr := string(body)
    log.Print(accessInfoStr)
    err = json.Unmarshal([]byte(accessInfoStr), &accessInfo)
	log.Print("We have access token "+ accessInfo.AccessToken)

    if err != nil {
    	fetchError = errors.New("Parse Error")
    	return
    } 

    return

}

func (handler *UserHandler) OAuthWXUser(w rest.ResponseWriter, req *rest.Request) {
	code := req.URL.Query().Get("wx_code")
	if code == "" {
		rest.Error(w, "wx_code is required", http.StatusBadRequest)
		return
	}

	accessInfo, fetchError := fetchOAuthWXUser(code)

	response := MakeResponse()

	if fetchError != nil || accessInfo.AccessToken == ""{
		response["status"] = "Error on accessInfo"
		w.WriteJson(response)
		return
	}

	userinfo, fetchError := fetchOAuthWXUserInfo(accessInfo.AccessToken, accessInfo.Openid)

	if fetchError != nil || userinfo.Openid == "" {
		response["status"] = "Error on userInfo"
		w.WriteJson(response)
		return
	}

	w.WriteJson(userinfo)
}
