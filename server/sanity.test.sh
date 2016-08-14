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
    echo -e "\n\n"
}


#query user by name
function query_user_by_name() {
    echo -e ${HR}
    echo -e "Query user by name..."
    echo -e 'curl -X GET '${RESTSERVER}'/user/name/'${USERNAME}
    curl -X GET ${RESTSERVER}/user/name/${USERNAME}
    echo -e "\n\n"
}

#query user by uid
function query_user_by_id() {
    echo -e ${HR}
    echo -e "Query user by uid..."
    USERID=$(curl -X GET http://localhost:9527/user/name/${USERNAME} 2>/dev/null | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["uid"]')
    echo -e 'curl -X GET '${RESTSERVER}'/user/id/'${USERID}
    curl -X GET ${RESTSERVER}/user/id/${USERID}
    echo -e "\n\n"
}

#delete user by uid
function delete_user_by_id() {
    echo -e ${HR}
    echo -e "Delete user by uid..."
    USERID=$(curl -X GET http://localhost:9527/user/name/${USERNAME} 2>/dev/null | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["uid"]')
    echo -e 'curl -X DELETE '${RESTSERVER}'/user/id/'${USERID}
    curl -X DELETE ${RESTSERVER}/user/id/${USERID}
    echo -e "\n\n"
}

#delete user by name
function delete_user_by_name() {
    echo -e ${HR}
    echo -e "Delete user by name..."
    echo -e 'curl -X DELETE '${RESTSERVER}'/user/name/'${USERNAME}
    curl -X DELETE ${RESTSERVER}/user/name/${USERNAME}
    echo -e "\n\n"
}

#=======================================================================================
#create story
function create_story() {
    echo -e ${HR}
    echo -e "Create Story...."
    USERID=$(curl -X GET http://localhost:9527/user/name/${USERNAME} 2>/dev/null | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["uid"]')
    if [ $# -eq 0 ]; then
        echo -e 'curl -H "Content-Type: application/json" -X POST 
            -d { "author": {"uid":"'${USERID}'"},
                 "title":"Test Story Title", "content":"story content no less than 20 chars..." }
            '${RESTSERVER}'/story'
        curl -H "Content-Type: application/json" -X POST \
            -d '{ "author": {"uid":"'${USERID}'"},
                  "title":"Test Story Title", "content":"story content no less than 20 chars..." }' \
            ${RESTSERVER}/story
    else
        PARENT=${1}
        echo -e 'curl -H "Content-Type: application/json" -X POST 
            -d { "author": {"uid":"'${USERID}'"},"parent_id":"'${PARENT}'",
                 "title":"Test Story Title", "content":"'${2}': story content no less than 20 chars..." } 
            '${RESTSERVER}'/story'
        curl -H "Content-Type: application/json" -X POST \
            -d '{ "author": {"uid":"'${USERID}'"},"parent_id":"'${PARENT}'",
                  "title":"Test Story Title", "content":"'${2}': story content no less than 20 chars..." }' \
            ${RESTSERVER}/story
    fi
    echo -e "\n\n"
}

#create story chain
function create_story_chain() {
    echo -e ${HR}
    echo -e "Create Story Chain...."
    PARENT=$(create_story 2>/dev/null | sed -n '/{$/,/}$/p' | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["sid"]')
    query_story_by_id ${PARENT}
    for i in 1 2 3 4 5; do
        PARENT=$(create_story ${PARENT} ${i} 2>/dev/null | sed -n '/{$/,/}$/p' | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["sid"]')
        query_story_by_id ${PARENT}
    done
    echo -e "\n\n"
}


#query story by user name
function query_story_by_user_name() {
    echo -e ${HR}
    echo -e "Query story by user name..."
    echo -e 'curl -X GET '${RESTSERVER}'/story/user/name/'${USERNAME}
    curl -X GET ${RESTSERVER}/story/user/name/${USERNAME}
    echo -e "\n\n"
}

#query story by id
function query_story_by_id() {
    echo -e ${HR}
    echo -e "Query story by user name..."
    echo -e 'curl -X GET '${RESTSERVER}'/story/'${1}
    curl -X GET ${RESTSERVER}/story/${1}
    echo -e "\n\n"
}


#delete story by user name
function delete_story_by_user_name() {
    echo -e ${HR}
    echo -e "Delete story by user name..."
    echo -e 'curl -X DELETE '${RESTSERVER}'/story/user/name/'${USERNAME}
    curl -X DELETE ${RESTSERVER}/story/user/name/${USERNAME}
    echo -e "\n\n"
}


#=======================================================================================

function test_user() {
    create_user
    query_user_by_name
    query_user_by_id
    x=`echo ${RANDOM} %2 | bc`
    if [ ${x} -eq 0 ]; then
        delete_user_by_id
    else
        delete_user_by_name
    fi
    #`echo -e "\n\n"${HR}
}

function test_story() {
    create_user
    create_story
    query_story_by_user_name
    delete_story_by_user_name
    delete_user_by_name
}

function test_story_chain() {
    create_user
    create_story_chain
    delete_story_by_user_name
    delete_user_by_name
}

#=======================================================================================

#test_user

#test_story
test_story_chain


