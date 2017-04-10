
#ifndef _TRKFRAME_H_
#define _TRKFRAME_H_
#include <mongoc.h>
#include <bson.h>
#include "util.h"
#include "gps.h"
int VerifyTRKFrame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port, unsigned char * sendbuffer,char* pmsn); 

void insertSensorRecord_trk( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value,char *name,int sensorType,char * lat,char * lng,char *tag);
#endif
