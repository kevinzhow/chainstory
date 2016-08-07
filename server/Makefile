NO_COLOR=\033[0m
OK_COLOR=\033[0;36m
WARN_COLOR=\033[33;01m
ERROR_COLOR=\033[31;01m

MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
MKFILE_DIR := $(dir $(MKFILE_PATH))

GOPATH := ${MKFILE_DIR}_vendor:${MKFILE_DIR}
export GOPATH

BIN_TARGET=${MKFILE_DIR}build/bin/chainstory 
SRC_FILES=${MKFILE_DIR}main/main.go \
		  ${MKFILE_DIR}routes/route.go \
		  ${MKFILE_DIR}controllers/hello.go \
		  ${MKFILE_DIR}controllers/index.go

CONF_TARGET=${MKFILE_DIR}build/conf/chainstory 
CONF_FILES=conf/chainstory.conf

TARGET=${BIN_TARGET} ${CONF_TARGET}



default: ${TARGET}  


${BIN_TARGET} : ${SRC_FILES} 
	@echo "$(OK_COLOR)==> build from $(ERROR_COLOR)${MKFILE_DIR}$(OK_COLOR) into $(ERROR_COLOR)${BIN_TARGET}$(NO_COLOR)"
	mkdir -p ${MKFILE_DIR}build/bin && mkdir -p ${MKFILE_DIR}build/conf && mkdir -p ${MKFILE_DIR}build/logs
	cd ${MKFILE_DIR} && source env.sh && go build  -gcflags "-N -l"  -v -o ${BIN_TARGET} ./main


${CONF_TARGET} : ${CONF_FILES}
	@echo "$(OK_COLOR)==> build from $(ERROR_COLOR)${MKFILE_DIR}$(OK_COLOR) into $(ERROR_COLOR)${CONF_TARGET}$(NO_COLOR)"
	cp -r ${MKFILE_DIR}conf/* ${MKFILE_DIR}build/conf

.PHONY : clean

clean:
	@echo "clean project ..."
	@rm -rf ${MKFILE_DIR}
