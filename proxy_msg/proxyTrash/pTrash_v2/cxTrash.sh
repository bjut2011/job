#!/bin/bash
cd "/root/pTrash_v2"
CMD="./xcTrash"
PID="./log/PID.txt"
LOG="./log/log.txt"
DEBUG="false"

# ---------------------------------------------------

# 启动函数
function start {
	./xcTrash >> $LOG 2>&1 1>&1 &
	mypgmpid=$!
        echo $!
	echo $mypgmpid > $PID
	echo "start [ok]"
}

# 停止函数
function stop {
	kill `cat $PID`
	rm $PID
	echo "stop [ok]"
}

# --------------------------------------------------


echo "$CMD $1"

case "$1" in
start)
	start
;;
start_debug)
	DEBUG="true"
	start
;;
restart)
	if [ -f $PID ] ; then
		stop
		sleep 4
	fi
	start
;;
stop)
	stop
	exit 0
;;
esac

