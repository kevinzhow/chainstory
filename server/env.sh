#!/bin/bash

SCRIPTPATH=`pwd -P`
popd > /dev/null

export GOPATH="${SCRIPTPATH}/_vendor:${SCRIPTPATH}"
export PATH="$PATH:${SCRIPTPATH}/_vendor/bin"
