#ifndef _MQTTCLIENT_H_
#define _MQTTCLIENT_H_
#include "stdio.h"
#include "stdlib.h"
#include "string.h"
#include "MQTTClient.h"
#include <json-c/json.h>
#include <time.h>

#define TOPIC       "m2mdm/devicedata/json"
#define ADDRESS     "tcp://219.141.189.130:1883"
#define QOS         1
#define TIMEOUT     10000L
MQTTClient  getMClient();
void getCurrentTime(char *timeString);
#endif
