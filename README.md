# Chainstory

Please review the [PRD](https://docs.google.com/document/d/16fkjJkY-aUkDOxmOzfRGl2GatT6ntgmithlVUFxKaHs/edit?usp=sharing) first to understand the background and vision.

## Folder structures

| Folder  | Usage  |  
|---|---|
| web  | for all frontend files  |
| server  | for all backgend files  |
| web/static  | frontend production complied files  |
| web/index.html  | frontend home page |
| web/src  | frontend source files |
| web/components  | frontend vue components, includes component **html** and **js** also **less** |
| web/views  | frontend vue views files |
| web/main.js  | frontend vue entry, where the frontend begins |
| server/main  | where server begins |
| server/conf  | the server configution |
| server/handler  | just controllers |
| server/models  | just models |
| server/daos  | just DAOs |
| server/routes  | just routes |
| server/utils  | just utils |

## Frontend

Make sure you already done the command below

```
cd web
npm install
```

To start the frontend dev server

```
npm run dev
```


## Backend

### To build the API Server

```
cd server
source ./env.sh
make vendor # grabbing the 3rd party libs
make
```

Everything will be built into `build` directory.

### Get watch tool [fswatch](https://github.com/codeskyblue/fswatch)

```
go get -u -v github.com/codeskyblue/fswatch
```

Now you can watch the filechanges, run the command at server folder, this will start the server automatically.

```
fswatch
```

`too many open files`

For mac, run the following command

```
sysctl -w kern.maxfiles=20480
sysctl -w kern.maxfilesperproc=18000
ulimit -S -n 2048
```

### Run the Server

To run the backend server, the command line as below:

```
./build/bin/chainstory
```

The log will be put into `./build/logs/chain_stroy.log`

If you want to serve the latest web, run this command in `web` folder to compile the latest frontend.Everything will be put into the `static` directory.


```
npm run build
```

### Run test

```
cd test
npm test
```

## API

API that frontend needs

### Story

API about Story

#### Fetch Story

```
Request

GET /stories/:id
```

| Parameters  | Type  | Comment |
|---|---|----|------|----------|
| id  |  string  | story ID |

```
Response

{
  "story" : {
    "id": "uuid",
    "author" : {
      "nickname": "左耳朵耗子"，
      "avatar": "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
    },
    "created_at": "635353533"
    "space": 6,
    "title": "北京奇侠传",
    "nodes": [
    {
      "id": "uuid",
      "likes": 126,
      "author": {
        "nickname": "左耳朵耗子"，
        "avatar": "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
      },
      "content": "小方这年刚刚考上北邮，正准备投身到祖国四化的伟大事业中，没想到一个人的发是无法预料的，要看历史的进程，小方的爸爸给小方取了个伟大的名字——滨兴，寓意着万邦来朝，祖国可以兴盛伟大。",
      "like_status": false,
      "created_at": "635353533"
    },
    {
      "id": "uuid",
      "likes": 6,
      "author": {
        "nickname": "周楷雯 Kevin"，
        "avatar": "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
      },
      "content": "小方这年刚刚考上北邮，正准备投身到祖国四化的伟大事业中，没想到一个人的发是无法预料的，要看历史的进程，小方的爸爸给小方取了个伟大的名字——滨兴，寓意着万邦来朝，祖国可以兴盛伟大。",
      "like_status": true,
      "created_at": "635353533"
    }
    ]
  }
}
```

#### Create Story

Launch a new story

```
Request

POST /stories/

{
  "title": "北京奇侠传",
  "content": "2017 年，北京政府实行了全面断网的政策，一时间，中国失去了和外界的联系，无数人都在猜测，这是新一代的闭关锁国，还是有所策划的一场大阴谋",
  "access_token": "andsdnNASDNSanidnassdnasodn_asbasd222"
}

```

| Parameters  | Type  | Comment |
|---|---|----|------|----------|
| title  |  string  | story title |
| content  |  string  | beginning of this story which is also a story node |
| access_token  |  string  | which you can verify the user identity |

```
Response

{
  "story" : {
    "id": "uuid",
    "author" : {
      "nickname": "周楷雯 Kevin"，
      "avatar": "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
    },
    "created_at": "635353533"
    "space": 6,
    "title": "北京奇侠传",
    "nodes": [
    {
      "id": "uuid",
      "likes": 6,
      "author": {
        "nickname": "周楷雯 Kevin"，
        "avatar": "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
      },
      "content": "小方这年刚刚考上北邮，正准备投身到祖国四化的伟大事业中，没想到一个人的发是无法预料的，要看历史的进程，小方的爸爸给小方取了个伟大的名字——滨兴，寓意着万邦来朝，祖国可以兴盛伟大。",
      "like_status": true,
      "created_at": "635353533"
    }
    ]
  }
}
```

#### Story Node

This could append a story node to a exisiting story.

```
Request

POST /stories/:id/

{
  "content": "2017 年，北京政府实行了全面断网的政策，一时间，中国失去了和外界的联系，无数人都在猜测，这是新一代的闭关锁国，还是有所策划的一场大阴谋",
  "access_token": "andsdnNASDNSanidnassdnasodn_asbasd222"
}

```

| Parameters  | Type  | Comment |
|---|---|----|------|----------|
| id  |  uuid  | story ID |
| content  |  string  | a story node content |
| access_token  |  string  | which you can verify the user identity |

```
Response

{
  "story" : {
    "id": "uuid",
    "author" : {
      "nickname": "周楷雯 Kevin"，
      "avatar": "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
    },
    "created_at": "635353533"
    "space": 6,
    "title": "北京奇侠传",
    "nodes": [
    {
      "id": "uuid",
      "likes": 6,
      "author": {
        "nickname": "周楷雯 Kevin"，
        "avatar": "http://tva3.sinaimg.cn/crop.27.27.337.337.180/538efefbgw1eg77da7jggj20aw0aw743.jpg"
      },
      "content": "小方这年刚刚考上北邮，正准备投身到祖国四化的伟大事业中，没想到一个人的发是无法预料的，要看历史的进程，小方的爸爸给小方取了个伟大的名字——滨兴，寓意着万邦来朝，祖国可以兴盛伟大。",
      "like_status": true,
      "created_at": "635353533"
    }
    ]
  }
}
```



## Like

### Made Like

This could append a story node to a exisiting story.

```
Request

POST /stories/:id/likes

{
  "access_token": "andsdnNASDNSanidnassdnasodn_asbasd222"
}

```

| Parameters  | Type  | Comment |
|---|---|----|------|----------|
| id  |  uuid  | story ID |
| node_id  |  uuid  | story node ID which user liked |
| access_token  |  string  | which you can verify the user identity |

```
Response

200: Like Made
```

### Remove Like

```
Request

DELETE /stories/:id/likes

{
  "access_token": "andsdnNASDNSanidnassdnasodn_asbasd222"
}

```

| Parameters  | Type  | Comment |
|---|---|----|------|----------|
| id  |  uuid  | story node ID |
| access_token  |  string  | which you can verify the user identity |

```
Response

200: Like Removed
```

## Model

Basic all models

### User

| Attribute  | Type  | Comment |
|---|---|----|------|----------|
| uid  |  uuid  | User ID |
| wx_openid  |  string  | Wechat User OpenID |
| wb_openid  |  string | Weibo User OpenID  |
| type  | int  | 0 means WeChat, 1 means Weibo |
| nickname  | string  | user nickname from OAuth |
| avatar  | string  | user avatar url from OAuth |
| created_at  | unixtime  | when did this user join |

### Like

| Attribute  | Type  | Comment |
|---|---|----|------|----------|
| user  |  User  | who made this like |
| node  |  Story Node  | to which story node |

### Story Node

| Attribute  | Type  | Comment |
|---|---|----|------|----------|
| id  |  uuid  | Story ID |
| author  |  User  | Who launched this story |
| title  |  string | Story Title |
| space  |  int | How many paragraph(Story Node) could this story includes |
| created_at  | unixtime  | when did this story created |
| content  |  string | Story paragraph node content |
| likes  |  int | Story likes count |
| like_status  |  bool | Reader liked this node or not |
| parent_node_ids  | [Story Node ID]  | parent nodes that complete this story |
| child_node_ids  | [Story Node ID]  | child nodes that complete this story |
