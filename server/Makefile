NO_COLOR=\033[0m
OK_COLOR=\033[0;36m
WARN_COLOR=\033[33;01m
ERROR_COLOR=\033[31;01m

MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
MKFILE_DIR := $(dir $(MKFILE_PATH))

GOPATH := ${MKFILE_DIR}_vendor:${MKFILE_DIR}
export GOPATH

BIN_TARGET=${MKFILE_DIR}build/bin/chainstory

SRC_FILES=$(wildcard $(MKFILE_DIR)/*.go)

CONF_TARGET=${MKFILE_DIR}build/conf/chainstory.conf
CONF_FILES=conf/chainstory.conf

TARGET=${BIN_TARGET} ${CONF_TARGET}


default: ${TARGET}

${BIN_TARGET} : ${SRC_FILES}
	@echo "$(OK_COLOR)==> build Binary File from $(ERROR_COLOR)${MKFILE_DIR}$(OK_COLOR) into $(ERROR_COLOR)${BIN_TARGET}$(NO_COLOR)"
	mkdir -p ${MKFILE_DIR}build/bin && mkdir -p ${MKFILE_DIR}build/conf && mkdir -p ${MKFILE_DIR}build/logs
	cd ${MKFILE_DIR} && go build -v -o ${BIN_TARGET} ./src/main


${CONF_TARGET} : ${CONF_FILES}
	@echo "$(OK_COLOR)==> build Configuration File from $(ERROR_COLOR)${MKFILE_DIR}$(OK_COLOR) into $(ERROR_COLOR)${CONF_TARGET}$(NO_COLOR)"
	cp -r ${MKFILE_DIR}conf/* ${MKFILE_DIR}build/conf


vendor: vendor_get
	cd ${MKFILE_DIR} \
    && rm -rf `find ./_vendor/src -type d -name .git` \
	&& rm -rf `find ./_vendor/src -type d -name .hg` \
	&& rm -rf `find ./_vendor/src -type d -name .bzr` \
	&& rm -rf `find ./_vendor/src -type d -name .svn`

vendor_get: vendor_clean
	GOPATH=${MKFILE_DIR}_vendor go get -d -u -v \
	github.com/ant0ine/go-json-rest/rest \
	github.com/StephanDollberg/go-json-rest-middleware-jwt \
	gopkg.in/mgo.v2

vendor_clean:
	rm -dRf ${MKFILE_DIR}_vendor/src

.PHONY : clean

clean:
	@echo "clean project ..."
	@rm -rf ${MKFILE_DIR}/build/bin
	@rm -rf ${MKFILE_DIR}/build/conf
