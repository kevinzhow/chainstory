#!/bin/bash
set -e

RESTSERVER=http://localhost:9527
USERNAME="test_user"
HR=`printf '=%.0s' {1..80}`

#create user
function create_user() {
    echo -e ${HR}
    echo -e "Create User...."
    echo -e 'curl -H "Content-Type: application/json" -X POST -d { "name":"'${USERNAME}'","type":0, "wx_openid":"wx_username", "wb_openid":"", "avator":"aavatorurl"} '${RESTSERVER}'/user'
    curl -H "Content-Type: application/json" -X POST -d '{ "name":"'${USERNAME}'","type":0, "wx_openid":"wx_username", "wb_openid":"", "avator":"aavatorurl"}' ${RESTSERVER}/user
}


#query user by name
function query_user_by_name() {
    echo -e "\n\n"${HR}
    echo -e "Query user by name..."
    echo -e 'curl -X GET '${RESTSERVER}'/user/name/'${USERNAME}
    curl -X GET ${RESTSERVER}/user/name/${USERNAME}
}

#query user by uid
function query_user_by_id() {
    echo -e "\n\n"${HR}
    echo -e "Query user by uid..."
    USERID=$(curl -X GET http://localhost:9527/user/name/${USERNAME} 2>/dev/null | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["uid"]')
    echo -e 'curl -X GET '${RESTSERVER}'/user/id/'${USERID}
    curl -X GET ${RESTSERVER}/user/id/${USERID}
}

#delete user by uid
function delete_user_by_id() {
    echo -e "\n\n"${HR}
    echo -e "Delete user by uid..."
    USERID=$(curl -X GET http://localhost:9527/user/name/${USERNAME} 2>/dev/null | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["uid"]')
    echo -e 'curl -X DELETE '${RESTSERVER}'/user/id/'${USERID}
    curl -X DELETE ${RESTSERVER}/user/id/${USERID}
}

#delete user by name
function delete_user_by_name() {
    echo -e "\n\n"${HR}
    echo -e "Delete user by name..."
    echo -e 'curl -X DELETE '${RESTSERVER}'/user/name/'${USERNAME}
    curl -X DELETE ${RESTSERVER}/user/name/${USERNAME}
}

function test_user() {
    create_user
    query_user_by_name
    query_user_by_id
    x=`echo ${RANDOM} %2 | bc`
    if [ x -eq 0 ]; then
        delete_user_by_id
    else
        delete_user_by_name
    fi
    echo -e "\n\n"${HR}
}

test_user
