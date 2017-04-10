
#ifndef _ASDU_H_
#define _ASDU_H_
#include <mongoc.h>
#include <bson.h>
#include "util.h"
int VerifyASDUFrame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port, unsigned char * send_Buf); 

void upperquery_x(unsigned char * info, unsigned short usTemp_Length);
void upperquery_a(unsigned char * info ,unsigned short usTemp_Length);
void upperquery_f(unsigned char * info ,unsigned short usTemp_Length);

void insertSensorRecord_x( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,float value,char *name,int sensorType,char * unit,char *tag,int icon,int order,int display);
void insertYX2Record_x( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value);
void insertYX1Record_x( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value);
void insertYX0Record_x( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value);
#endif
