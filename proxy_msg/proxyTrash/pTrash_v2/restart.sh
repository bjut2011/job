#!bin/bash

while :
do
    if [ $(ps -ef | grep "xcTrash" | grep -v "grep" | wc -l) -eq 1 ];then
        kill $(ps -ef|grep "xcTrash"|awk '{print $1}')
        echo "kill"
    ./xcTrash
    echo "restart"
    else
    echo "not found"
    fi
    sleep 2
done
