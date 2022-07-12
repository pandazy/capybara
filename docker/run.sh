#!/bin/bash

# 
# Params definition:
# $YARN: a valid yarn command (native yarn command or a script defined by package.json)
# $CAPYBARA_VOLUMN_PATH: the local dev path of the code directory where the docker container runs 
# $PORT: HTTP server's URL port number 
#
# Usage example:
#```
# sh docker/run.sh
#
# YARN=test sh docker/run.sh
# YARN=start
# ```
#

docker run --rm -ti --env YARN=${YARN:-start} -v $CAPYBARA_VOLUMN_PATH:/dermis -p ${PORT:-3000}:3000 jszhengyq/dermis