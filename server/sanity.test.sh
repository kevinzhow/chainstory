#!/bin/bash

RESTSERVER=http://localhost:9527
USERNAME="test_user"
HR=`printf '=%.0s' {1..80}`

#create user
echo -e ${HR}
echo -e "Create User...."
echo -e 'curl -H "Content-Type: application/json" -X POST -d { "name":"'${USERNAME}'","type":0, "wx_openid":"wx_username", "wb_openid":"", "avator":"aavatorurl"} '${RESTSERVER}'/user'
curl -H "Content-Type: application/json" -X POST -d '{ "name":"'${USERNAME}'","type":0, "wx_openid":"wx_username", "wb_openid":"", "avator":"aavatorurl"}' ${RESTSERVER}/user


#query user by name
echo -e "\n\n"${HR}
echo -e "Query user by name..."
echo -e 'curl -X GET '${RESTSERVER}'/user/name/'${USERNAME}
curl -X GET ${RESTSERVER}/user/name/${USERNAME}

#query user by uid
echo -e "\n\n"${HR}
echo -e "Query user by uid..."
USERID=$(curl -X GET http://localhost:9527/user/name/test_user 2>/dev/null | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["uid"]')
echo -e 'curl -X GET '${RESTSERVER}'/user/id/'${USERID}
curl -X GET ${RESTSERVER}/user/id/${USERID}

#delete user by uid
echo -e "\n\n"${HR}
echo -e "Delete user by uid..."
echo -e 'curl -X DELETE '${RESTSERVER}'/user/id/'${USERID}
curl -X DELETE ${RESTSERVER}/user/id/${USERID}

echo -e "\n\n"${HR}
