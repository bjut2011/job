#include "trkframe.h"
#include "queue.h"
#include "gps.h"
#include <math.h>
#define POW2_24F ( 16777216.0) // 2^24
extern queue_t g_qalarm;
extern int bupdate;
extern  mongoc_client_t *mgclient;
void commond_parse(unsigned char code,unsigned char * pTemp_Buf,int start,int end,char * pout);
void upperquery_trk(char * pid,char* platlon);
void upperquery_power(char * pid,int power);

int VerifyTRKFrame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port,unsigned  char * sendbuffer,char * pmsn){
    int i=0;
    for(;i<usTemp_Length;i++){
       printf("%02x",pTemp_Buf[i]);
    }

    printf("\n");
    i=10;
    char *pid=(char *)malloc(sizeof(char)*(20));
    memset(pid,'\0',20);
    char *platlon=(char *)malloc(sizeof(char)*(128));
    memset(platlon,'\0',128);

    int len=0;
    if(pTemp_Buf[2]==0x01){
        sendbuffer[2]=0x01;
        sendbuffer[3]=0x00;
        int j=0;
        for(;j<32;j++){
           sendbuffer[j+4]=0x01;
        }
        int i_num = htonl(33);
        sendbuffer[0]=*((unsigned char *)&i_num + 3);
        sendbuffer[1]=*((unsigned char *)&i_num + 2);
        len=36;
        unsigned char smsn[4];
        memset(smsn,'0',4);
        smsn[3]=pTemp_Buf[6];
        smsn[2]=pTemp_Buf[7];
        smsn[1]=pTemp_Buf[8];
        smsn[0]=pTemp_Buf[9];
        unsigned char msn[256];
        memset(msn,'\0',256);
        HexToStr(msn,smsn,4);
        printf("msn:%s\n",msn);
        strcpy(pmsn,msn);
        
            
    }else if (pTemp_Buf[2]==0x02){
       printf(" ver fail\n");
    }else if (pTemp_Buf[2]==0x05){
       printf("GPS\n");
       double lat;    
       lat =  ((unsigned long)pTemp_Buf[13]<<24) +(pTemp_Buf[12]<<16)+(pTemp_Buf[11]<<8)+pTemp_Buf[10]; 
       double encLat = ((lat*180.0)/pow(2,25));
       printf("lan:%f",encLat);
       double lng;    
       lng =  ((unsigned long)pTemp_Buf[17]<<24) +(pTemp_Buf[16]<<16)+(pTemp_Buf[15]<<8)+pTemp_Buf[14]; 
       double encLon = ((lng*360.0)/pow(2,26));
       
       printf("lng:%f\n",encLon);
       double glatlon[2];
       glatlon[0]=encLat;
       glatlon[1]=encLon;
       gtransform(encLat,encLon,glatlon);

       
       double blatlon[2];
       bd_encrypt(glatlon[0],glatlon[1],blatlon);
       char platlng[128];
       memset(platlng,'\0',128);
       sprintf(platlng,"%f,%f",blatlon[0],blatlon[1]);
       upperquery_trk(pmsn, platlng);

       
    }else if (pTemp_Buf[2]==0x08){
       printf("单次定位请求\n");
       printf("result:%d\n",pTemp_Buf[3]);
    }else if (pTemp_Buf[2]==0x09){
       printf("一次性定位报告:\n");
    }else if (pTemp_Buf[2]==0x1A){
       printf("发送电池\n");
       printf("result:%d\n",pTemp_Buf[3]);
       upperquery_power(pmsn, pTemp_Buf[3]);
    }else if (pTemp_Buf[2]==0x1B){
       printf("低电状态报警:\n");
       printf("result:%d\n",pTemp_Buf[3]);
    }else if (pTemp_Buf[2]==0x1C){
       printf("低电量报告:\n");
    }else if (pTemp_Buf[2]==0x38){
       printf("温度传感器请求结果:\n");
       printf("result:%d\n",pTemp_Buf[3]);
    }else if (pTemp_Buf[2]==0x39){
       printf("湿度传感器请求结果:\n");
       printf("result:%d\n",pTemp_Buf[3]);
    }else if (pTemp_Buf[2]==0x3A){
       printf("方向传感器请求结果:\n");
       printf("result:%d\n",pTemp_Buf[3]);
    }else if (pTemp_Buf[2]==0x3B){
       printf("记步传感器请求结果:\n");
       printf("result:%d\n",pTemp_Buf[3]);
    }
  
    free(pid);
    free(platlon);
    


    //free(dsrc);
    return len;
}

void insertSensorRecord_trk( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value,char *name,int sensorType,char * lat,char* lng,char *tag){
     
   mongoc_cursor_t *cursor;
   bson_t *doc;
   bson_t *query;
   char *str;
   query = bson_new ();
   BSON_APPEND_UTF8 (query, "name", name);
   BSON_APPEND_OID (query, "device_id",de_oid);
   printf("%s\n",name);
   char stroid[25];
   bson_oid_to_string (de_oid, stroid);
   printf("de_id:%s\n",stroid);
   if(sensorcoll==NULL){
     printf("se error\n");
   }
   cursor = mongoc_collection_find (sensorcoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   printf("find se\n");
   bson_oid_t se_oid;
   bool bsensor=false;
   if(cursor==NULL){
     printf("cursor null");
   }
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          bsensor=true;
          //printf ("%s\n", str);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               //printf ("Found a field named: %s\n", bson_iter_key (&iter));
               
               bson_value_t *value;

               value = bson_iter_value (&iter);
             
               if (value->value_type == BSON_TYPE_OID) {
                 if(strcmp(bson_iter_key (&iter),"_id")==0){
                    bson_oid_copy(&value->value.v_oid,&se_oid);
                    //printf("se_oid\n");         
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 //printf ("%s\n", str);
               }
            }
          }
   }
   if(!bsensor){
     printf("test3\n");
     bson_t *sdoc = bson_new ();
     bson_oid_init (&se_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &se_oid);
     BSON_APPEND_OID (sdoc, "device_id", de_oid);
     printf("test4\n");
     BSON_APPEND_UTF8 (sdoc, "name", name);
     BSON_APPEND_INT32 (sdoc, "sensorType", sensorType);
     printf("test4\n");
     BSON_APPEND_INT32 (sdoc, "sensorSign", 0);
     BSON_APPEND_UTF8 (sdoc, "lat", lat);
     BSON_APPEND_UTF8 (sdoc, "lng", lng);
     printf("test4\n");
     time_t timep;
     time(&timep);
     BSON_APPEND_TIME_T (sdoc, "time", timep);
     bson_error_t serror;
     if (!mongoc_collection_insert (sensorcoll, MONGOC_INSERT_NONE, sdoc, NULL, &serror)) {
        fprintf (stderr, "%s\n", serror.message);
     }
     bson_destroy (sdoc);
   }
   printf("test2\n");
    bson_destroy (query);
    bson_error_t error;
    bson_oid_t oid;
    doc = bson_new ();
    bson_oid_init (&oid, NULL);
    char locoid[128];
    memset(locoid,'\0',128);
    bson_oid_to_string (&oid, locoid);
    BSON_APPEND_OID (doc, "_id", &oid);
    BSON_APPEND_OID (doc, "sensor_id", &se_oid);
    BSON_APPEND_OID (doc, "device_id", de_oid);
    BSON_APPEND_INT32 (doc, "value", value);
    BSON_APPEND_UTF8 (doc, "tag", tag);
    BSON_APPEND_UTF8 (doc, "lat", lat);
    BSON_APPEND_UTF8 (doc, "lng", lng);
    BSON_APPEND_UTF8 (doc, "locationID", locoid);
    BSON_APPEND_UTF8 (doc, "baiduLat", lat);
    BSON_APPEND_UTF8 (doc, "baiduLng", lng);
    char sdatetime[128];
    memset(sdatetime,'\0',128);
    time_t timep;  
    struct tm *p;   
     
    time(&timep);   
    p = localtime(&timep);  
    sprintf(sdatetime,"%4d-%02d-%02d %02d:%02d:%02d", (1900+p->tm_year), (1+p->tm_mon), p->tm_mday, p->tm_hour, p->tm_min, p->tm_sec);  
    BSON_APPEND_UTF8 (doc, "deviceUtcDate", sdatetime);
    BSON_APPEND_UTF8 (doc, "speed", "2");
    BSON_APPEND_UTF8 (doc, "course", "2");
    BSON_APPEND_UTF8 (doc, "dataType", "2");
    BSON_APPEND_UTF8 (doc, "ct", "2");
    BSON_APPEND_UTF8 (doc, "distance", "200");
    BSON_APPEND_TIME_T (doc, "time", timep);
    BSON_APPEND_DOUBLE (doc, "createtime", timep);

    if (!mongoc_collection_insert (sensorlogcoll, MONGOC_INSERT_NONE, doc, NULL, &error)) {
        fprintf (stderr, "%s\n", error.message);
    }
    char *pstr=(char*)malloc(sizeof(char)*25);
    memset(pstr,0,sizeof(char)*25);
    bson_oid_to_string (&se_oid, pstr);
    //enQueue(&g_qalarm,str);
 
    bson_destroy (doc);
   //
    time(&timep);
    bson_t *updatedoc = bson_new();

    bson_t child;
    //BSON_APPEND_INT32(updatedoc, "value", (value));
    //BSON_APPEND_TIME_T (updatedoc, "time", timep);
    bson_append_document_begin(updatedoc, "value", value, &child);
    BSON_APPEND_TIME_T (&child, "update_time", timep);
    bson_append_document_end(updatedoc, &child);
    bson_t reply;
    query = bson_new ();
    BSON_APPEND_OID (query, "_id",&se_oid);
    bson_t *update = BCON_NEW ("$set", "{", "value", BCON_DOUBLE(value),"updatetime",BCON_DOUBLE(timep), "}");
    if (!mongoc_collection_find_and_modify (sensorcoll, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
    }
    bson_destroy (updatedoc);
    bson_destroy (query);
    bson_destroy (update);
   //
}


void upperquery_trk(char * pid,char* platlon)
{  printf("u lng:%s\n",platlon);
   mongoc_collection_t *collection;
   mongoc_collection_t *sensorcoll;
   mongoc_collection_t *sensorlogcoll;
   if(mgclient==NULL){
      return;
   }
   collection = mongoc_client_get_collection (mgclient, "smart_graze_development", "devices");
   printf("client1\n");
   sensorcoll = mongoc_client_get_collection (mgclient, "smart_graze_development", "sensors");
   sensorlogcoll = mongoc_client_get_collection (mgclient, "smart_graze_development", "sensorlogs");
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   bson_t *query;
   char *str;
   bson_oid_t de_oid;
   query = bson_new ();
   BSON_APPEND_UTF8 (query, "sn", pid);

   cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   int bfind=0;  
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          printf ("%s\n", str);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               printf ("Found a field named: %s\n", bson_iter_key (&iter));
               
               bson_value_t *value;

               value = bson_iter_value (&iter);
             
               if (value->value_type == BSON_TYPE_OID) {
                 if(strcmp(bson_iter_key (&iter),"_id")==0){
                    bson_oid_copy(&value->value.v_oid,&de_oid);
                    char str1[25];
                    bson_oid_to_string (&value->value.v_oid, str1);
                    printf("de_oid %s\n",str1);
                    bfind=1;         
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 printf ("%s\n", str);
               }
            }
          }
   }

   bson_destroy (query);
   mongoc_cursor_destroy (cursor);
   if(bfind){

  
     //
     char *slat=strtok(platlon,",");
     char *slon=strtok(NULL,",");
     printf("strtok %s,%s\n",slat,slon);
     char sdatetime[128];
     memset(sdatetime,'\0',128);
     time_t timep;  
     struct tm *p;   
      
     time(&timep);   
     p = localtime(&timep);  
     sprintf(sdatetime,"%4d-%02d-%02d %02d:%02d:%02d", (1900+p->tm_year), (1+p->tm_mon), p->tm_mday, p->tm_hour, p->tm_min, p->tm_sec);  
     bson_t reply;
     bson_error_t error;
     query = bson_new ();
     BSON_APPEND_OID (query, "_id",&de_oid);
     bson_t *update = BCON_NEW ("$set", "{", "baiduLat", BCON_UTF8(slat), "baiduLng",BCON_UTF8(slon),"serverUtcDate",BCON_UTF8(sdatetime),"}");
     if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
       fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
     }
     bson_destroy (query);
     bson_destroy (update);
     insertSensorRecord_trk(sensorcoll,&de_oid,sensorlogcoll,0,"gps",1,slat,slon,"坐标");
   }
   //

   mongoc_collection_destroy (collection);
   mongoc_collection_destroy (sensorcoll);
   mongoc_collection_destroy (sensorlogcoll);

}

void upperquery_power(char * pid,int power)
{  
   mongoc_collection_t *collection;
   mongoc_collection_t *sensorcoll;
   mongoc_collection_t *sensorlogcoll;
   if(mgclient==NULL){
      return;
   }
   collection = mongoc_client_get_collection (mgclient, "smart_graze_development", "devices");
   printf("client1\n");
   sensorcoll = mongoc_client_get_collection (mgclient, "smart_graze_development", "sensors");
   sensorlogcoll = mongoc_client_get_collection (mgclient, "smart_graze_development", "sensorlogs");
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   bson_t *query;
   char *str;
   bson_oid_t de_oid;
   query = bson_new ();
   BSON_APPEND_UTF8 (query, "sn", pid);

   cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   int bfind=0;  
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
          printf ("%s\n", str);
          bson_free (str);
          bson_iter_t iter;
          bson_iter_t sub_iter;
          if (bson_iter_init (&iter, doc)) {
            while (bson_iter_next (&iter)) {
               printf ("Found a field named: %s\n", bson_iter_key (&iter));
               
               bson_value_t *value;

               value = bson_iter_value (&iter);
             
               if (value->value_type == BSON_TYPE_OID) {
                 if(strcmp(bson_iter_key (&iter),"_id")==0){
                    bson_oid_copy(&value->value.v_oid,&de_oid);
                    char str1[25];
                    bson_oid_to_string (&value->value.v_oid, str1);
                    printf("de_oid %s\n",str1);
                    bfind=1;         
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 printf ("%s\n", str);
               }
            }
          }
   }

   bson_destroy (query);
   mongoc_cursor_destroy (cursor);
   if(bfind){

  
     //
     char sdatetime[128];
     memset(sdatetime,'\0',128);
     time_t timep;  
     struct tm *p;   
      
     time(&timep);   
     p = localtime(&timep);  
     sprintf(sdatetime,"%4d-%02d-%02d %02d:%02d:%02d", (1900+p->tm_year), (1+p->tm_mon), p->tm_mday, p->tm_hour, p->tm_min, p->tm_sec);  
     bson_t reply;
     bson_error_t error;
     query = bson_new ();
     BSON_APPEND_OID (query, "_id",&de_oid);
     char * strpower[128];
     memset(strpower,'\0',128);
     sprintf(strpower,"%d",power);
     bson_t *update = BCON_NEW ("$set", "{", "Electricity", BCON_UTF8(strpower),"serverUtcDate",BCON_UTF8(sdatetime),"}");
     if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
       fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
     }
     bson_destroy (query);
     bson_destroy (update);
     //insertSensorRecord_trk(sensorcoll,&de_oid,sensorlogcoll,0,"gps",1,slat,slon,"坐标");
   }
   //

   mongoc_collection_destroy (collection);
   mongoc_collection_destroy (sensorcoll);
   mongoc_collection_destroy (sensorlogcoll);

}
