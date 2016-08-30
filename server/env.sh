#!/bin/bash

SCRIPTPATH=`pwd -P`

export GOPATH="${SCRIPTPATH}/_vendor:${SCRIPTPATH}"
export PATH="$PATH:${SCRIPTPATH}/_vendor/bin"
