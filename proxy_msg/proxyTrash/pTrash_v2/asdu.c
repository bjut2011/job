#include "asdu.h"
#include "queue.h"
#include "mqttclient.h"
extern  mongoc_client_t *mgclient;
int VerifyASDUFrame(unsigned char * pTemp_Buf, unsigned short usTemp_Length, unsigned char ucTemp_Port, unsigned char * send_Buf){
    int i=0;
    for(;i<usTemp_Length;i++){
       printf("%02x",pTemp_Buf[i]);
    }

    printf("\n");
    BYTE *dsrc=pTemp_Buf;
    printf("%02x\n",dsrc[0]);
    
    if(dsrc[0]==0x68){
     printf("okok\n");
    }
    if(dsrc[4]==0x87)
    {
     printf("0x87\n");
     upperquery_x(dsrc,usTemp_Length);
    }else if (dsrc[4]==0x01 || dsrc[4]==0x04||dsrc[4]==0x05||dsrc[4]==0x06){
        if(dsrc[4]==0x04){
          upperquery_x(dsrc,usTemp_Length);
        }else if (dsrc[4]==0x05){
          upperquery_a(dsrc,usTemp_Length);
        }else if (dsrc[4]==0x06){
          upperquery_f(dsrc,usTemp_Length);
        }
  
        send_Buf[0]=0x68;
        send_Buf[1]=30;
        send_Buf[2]=30;
        send_Buf[3]=0x68;
        send_Buf[4]=dsrc[4];
        send_Buf[5]=0x00;
        send_Buf[6]=0x00;
        i=0;
        for(;i<16;i++){
          send_Buf[i+7]=pTemp_Buf[i+7];
        }
        for(i=0;i<4;i++){
          send_Buf[i+23]=pTemp_Buf[i+23];
        }
        send_Buf[27]=0x01;
        send_Buf[28]=0x00;
        send_Buf[29]=0x00;
        int cs=send_Buf[5];
        int m=6;
        for(;m<30;m++){
          cs+=send_Buf[m];
        }
        cs =cs&0xFF;
        send_Buf[30]=cs;
        
        cs=send_Buf[4];
        m=5;
        for(;m<31;m++){
          cs+=send_Buf[m];
        }
        cs =cs&0xFF;
        send_Buf[31]=cs;
        send_Buf[32]=0x16;
        return 33;
        
        
    }



    return 0x01;
}

void insertYX0Record_x( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value){
   
   if(value&1)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"位置1",2,"","有效",1,18,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"位置1",2,"","无效",0,18,1);
   }
   if(value&2)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"位置2",2,"","有效",1,17,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"位置2",2,"","无效",0,17,1);
   }
   if(value&4)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"副箱传感器",2,"","有效",1,101,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"副箱传感器",2,"","无效",0,101,1);
   }
}

void insertSensorRecord_x( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,float value,char *name,int sensorType,char * unit,char *tag,int icon,int order,int display){
     
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
   printf("%s\n",stroid);
   cursor = mongoc_collection_find (sensorcoll, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   bson_oid_t se_oid;
   bool bsensor=false;
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
                 char str1[25];
                 bson_oid_to_string (&value->value.v_oid, str1);
                 //printf ("%s\n", str1);
               }
            }
          }
   }
   mongoc_cursor_destroy (cursor);
   if(!bsensor){
     bson_t *sdoc = bson_new ();
     bson_oid_init (&se_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &se_oid);
     BSON_APPEND_OID (sdoc, "device_id", de_oid);
     BSON_APPEND_UTF8 (sdoc, "name", name);
     BSON_APPEND_UTF8 (sdoc, "tag", tag);
     BSON_APPEND_INT32 (sdoc, "sensorType", sensorType);
     BSON_APPEND_INT32 (sdoc, "sensorSign", 0);
     BSON_APPEND_INT32 (sdoc, "order", order);
     BSON_APPEND_INT32 (sdoc, "display", display);
     BSON_APPEND_UTF8 (sdoc, "sensorUnit", unit);
     time_t timep;
     time(&timep);
     BSON_APPEND_TIME_T (sdoc, "time", timep);
     bson_error_t serror;
     if (!mongoc_collection_insert (sensorcoll, MONGOC_INSERT_NONE, sdoc, NULL, &serror)) {
        fprintf (stderr, "%s\n", serror.message);
     }
     bson_destroy (sdoc);
   }
    bson_destroy (query);
    bson_error_t error;
    bson_oid_t oid;
    char svalue[128];
    memset(svalue,'\n',128);
    sprintf(svalue,"%.2f",value);
    doc = bson_new ();
    bson_oid_init (&oid, NULL);
    BSON_APPEND_OID (doc, "_id", &oid);
    BSON_APPEND_OID (doc, "sensor_id", &se_oid);
    BSON_APPEND_UTF8 (doc, "value", svalue);
    BSON_APPEND_UTF8 (doc, "tag", tag);
    time_t timep;
    time(&timep);
    BSON_APPEND_DOUBLE (doc, "update_time", timep);
    BSON_APPEND_TIME_T (doc, "time", timep);
    if (!mongoc_collection_insert (sensorlogcoll, MONGOC_INSERT_NONE, doc, NULL, &error)) {
        fprintf (stderr, "%s\n", error.message);
    }
    bson_destroy (doc);
   //
    time(&timep);
    bson_t reply;
    query = bson_new ();
    BSON_APPEND_OID (query, "_id",&se_oid);
    bson_t *update = BCON_NEW ("$set", "{", "value", BCON_UTF8(svalue),"tag",BCON_UTF8(tag),"updatetime",BCON_DOUBLE(timep),"icon",BCON_INT32(icon),"order",BCON_INT32(order),"display",BCON_INT32(display), "}");

    if (!mongoc_collection_find_and_modify (sensorcoll, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
    }
    //bson_destroy (updatedoc);
    bson_destroy (query);
    bson_destroy (update);
   //
}

void insertYX1Record_x( mongoc_collection_t * sensorcoll,bson_oid_t *de_oid,mongoc_collection_t * sensorlogcoll,int value){
   if(value&1)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"垃圾桶是否满",4,"","满",1,13,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"垃圾桶是否满",4,"","未满",1,13,1);
   }
   if(value&2)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"开门状态",4,"","异常",0,109,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"开门状态",4,"","正常",1,109,1);
   }
   if(value&4)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"滚动屏状态",4,"","异常",0,109,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"滚动屏状态",4,"","正常",1,109,1);
   }
   if(value&8)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"广告屏状态",4,"","异常",0,109,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"广告屏状态",4,"","正常",1,109,1);
   }
   if(value&16)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"压缩装置",4,"","异常",0,105,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"压缩装置",4,"","正常",1,105,1);
   }
   if(value&32)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"语音装置",4,"","异常",0,105,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"语音装置",4,"","正常",1,105,1);
   }
   if(value&64)
   {
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,0,"电池状态",4,"","异常",0,105,1);
   }else{
     insertSensorRecord_x(sensorcoll,de_oid,sensorlogcoll,1,"电池状态",4,"","正常",1,105,1);
   }
}



void upperquery_x(unsigned char * info ,unsigned short usTemp_Length)
{  
   mongoc_collection_t *collection;
   mongoc_collection_t *sensorcoll;
   mongoc_collection_t *sensorlogcoll;
   collection = mongoc_client_get_collection (mgclient, "smart_trash_development", "devices");
   sensorcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensors");
   sensorlogcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensorlogs");
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   bson_t *query;
   char *str;
   bson_oid_t de_oid;
   query = bson_new ();
   char phone[15];
   sprintf(phone,"%c%c%c%c%c%c%c%c%C%C%C%C%C%C%C",info[7],info[8],info[9],info[10],info[11],info[12],info[13],info[14],info[15],info[16],info[17],info[18],info[19],info[20],info[21]);
   BSON_APPEND_UTF8 (query, "device_sn", phone);
   printf("phone:%s\n",phone);

   cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   int ifind=0;
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
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
                    bson_oid_copy(&value->value.v_oid,&de_oid);
                    char str1[25];
                    bson_oid_to_string (&value->value.v_oid, str1);
                    //printf("de_oid %s\n",str1);   
                    ifind=1;      
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 //printf ("%s\n", str);
               }
            }
          }
   }

   bson_destroy (query);
   mongoc_cursor_destroy (cursor);
   if(ifind==0){
     bson_oid_t user_oid;
     bson_oid_init_from_string(&user_oid, "5757947e421aa9edf8000001");
     
     bson_t *sdoc = bson_new ();
     bson_oid_init (&de_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &de_oid);
     BSON_APPEND_OID (sdoc, "user_id", &user_oid);
     BSON_APPEND_UTF8 (sdoc, "device_name", phone);
     BSON_APPEND_UTF8 (sdoc, "device_sn", phone);
     time_t timep;
     time(&timep);
     BSON_APPEND_TIME_T (sdoc, "create_time", timep);
     bson_error_t serror;
     if (!mongoc_collection_insert (collection, MONGOC_INSERT_NONE, sdoc, NULL, &serror)) {
        fprintf (stderr, "%s\n", serror.message);
     }
     bson_destroy (sdoc);
   }

   insertYX1Record_x(sensorcoll,&de_oid,sensorlogcoll,info[27]);
   
   
   float iOpenCount=0;
   iOpenCount=((info[28]<<8)|info[29]);
   printf("Open count %f\n",iOpenCount);
   insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,iOpenCount,"今天开门次数",1,"次","今天开门次数",10,15,1);
  
   float iPressCount=0;
   iPressCount=(info[30]);
   printf("Press count %f\n",iPressCount);
   insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,iPressCount,"今天70%启动压缩装置次数",1,"次","今天70%启动压缩装置次数",10,15,1);
  
   float iPressCount_1=0;
   iPressCount_1=(info[31]);
   printf("Press 90% count %f\n",iPressCount_1);
   insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,iPressCount_1,"今天90%启动压缩装置次数",1,"次","今天90%启动压缩装置次数",10,15,1);
  

   float iMainBatteryVoltage=0;
   iMainBatteryVoltage=((info[32]<<8)|info[33])/100.0;
   printf("Main battery voltage %f\n",iMainBatteryVoltage);
   char svalue[128];
   sprintf(svalue,"%.2f",iMainBatteryVoltage);
   insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,iMainBatteryVoltage,"主电池电压",1,"V","正常",10,11,1);
   printf("1234455\n");
   float iSecondaryBatteryVoltage=0;
   iSecondaryBatteryVoltage=((info[34]<<8)|info[35])/100.0;
   printf("Secondary battery voltage %f\n",iSecondaryBatteryVoltage);
   sprintf(svalue,"%.2f",iSecondaryBatteryVoltage);
   insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,iSecondaryBatteryVoltage,"副电池电压",1,"V","正常",10,12,1);
   
   if(info[36]==0x00){
     insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,info[36],"电池充电状态",4,"V","未充电",10,12,1);
   }else if(info[36]==0x01){
     insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,info[36],"电池充电状态",4,"V","主电池充电",10,12,1);
   }else{
     insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,info[36],"电池充电状态",4,"V","副电池充电",10,12,1);
   }
   

   float iTemperature=0;
   iTemperature=((info[37]<<8)|info[38])/100.0;
   printf("temperature %f\n",iTemperature);
   insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,iTemperature,"温度",1,"度","正常",10,15,1);
    
   printf("39: %d\n",info[39]);
   insertYX0Record_x(sensorcoll,&de_oid,sensorlogcoll,info[39]);
   printf("39end: %d\n",info[39]);


   int iGPSValid =0;
   iGPSValid=info[40];
   printf("GPS data valid identification %d\n",iGPSValid);
   if (iGPSValid>0){
     insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,1,"GPS",2,"度","有效",1,7,1);
   }else{
     insertSensorRecord_x(sensorcoll,&de_oid,sensorlogcoll,0,"GPS",2,"度","无效",0,7,1);
   }


   double lng;    
   lng =  ((unsigned long)info[49]<<24)+(info[50]<<16) + (info[51]<<8) + (info[52]); 
       //while(lng>100){
       //    lng =lng/10.0;
       //}
   lng=lng/100000.0;
        double lat;    
   lat =  ((unsigned long)info[55]<<24) +(info[56]<<16)+(info[57]<<8)+info[58]; 
   lat=lat/100000.0;
   lng=lng/60.0;
   lat=lat/60.0;
   printf("Lat:%lf,%lf\n",lng,lat);
   //
   double fLongitude;
   double fLatitude;
   fLongitude=info[48];
   fLongitude +=lng;
   fLatitude=info[54];
   fLatitude +=lat;
   printf("lng,lat:%lf,%lf\n",fLongitude,fLatitude);
   bson_t reply;
   bson_error_t error;
   time_t timep;
   time(&timep);
   query = bson_new ();
   BSON_APPEND_OID (query, "_id",&de_oid);
   bson_t *update ;
   if(iGPSValid>0){
     update=BCON_NEW ("$set", "{", "lon", BCON_DOUBLE(fLongitude), "lat",BCON_DOUBLE(fLatitude),"update_time",BCON_DOUBLE(timep),"}");
     if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
     }
   }else{
     update=BCON_NEW ("$set", "{", "update_time",BCON_DOUBLE(timep),"}");
   }
   if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
   }
   bson_destroy (update);
   bson_destroy (query);
   //

   mongoc_collection_destroy (collection);
   mongoc_collection_destroy (sensorcoll);
   mongoc_collection_destroy (sensorlogcoll);


  

}



void upperquery_a(unsigned char * info ,unsigned short usTemp_Length)
{  
   mongoc_collection_t *collection;
   mongoc_collection_t *sensorcoll;
   mongoc_collection_t *sensorlogcoll;
   collection = mongoc_client_get_collection (mgclient, "smart_trash_development", "devices");
   sensorcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensors");
   sensorlogcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensorlogs");
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   bson_t *query;
   char *str;
   bson_oid_t de_oid;
   query = bson_new ();
   char phone[15];
   sprintf(phone,"%c%c%c%c%c%c%c%c%C%C%C%C%C%C%C",info[7],info[8],info[9],info[10],info[11],info[12],info[13],info[14],info[15],info[16],info[17],info[18],info[19],info[20],info[21]);
   BSON_APPEND_UTF8 (query, "device_sn", phone);
   printf("phone:%s\n",phone);

   cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   int ifind=0;
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
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
                    bson_oid_copy(&value->value.v_oid,&de_oid);
                    char str1[25];
                    bson_oid_to_string (&value->value.v_oid, str1);
                    //printf("de_oid %s\n",str1);   
                    ifind=1;      
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 //printf ("%s\n", str);
               }
            }
          }
   }

   bson_destroy (query);
   mongoc_cursor_destroy (cursor);
   if(ifind==0){
     bson_oid_t user_oid;
     bson_oid_init_from_string(&user_oid, "5757947e421aa9edf8000001");
     
     bson_t *sdoc = bson_new ();
     bson_oid_init (&de_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &de_oid);
     BSON_APPEND_OID (sdoc, "user_id", &user_oid);
     BSON_APPEND_UTF8 (sdoc, "device_name", phone);
     BSON_APPEND_UTF8 (sdoc, "device_sn", phone);
     time_t timep;
     time(&timep);
     BSON_APPEND_TIME_T (sdoc, "create_time", timep);
     bson_error_t serror;
     if (!mongoc_collection_insert (collection, MONGOC_INSERT_NONE, sdoc, NULL, &serror)) {
        fprintf (stderr, "%s\n", serror.message);
     }
     bson_destroy (sdoc);
   }

   insertYX1Record_x(sensorcoll,&de_oid,sensorlogcoll,info[27]);

   insertYX0Record_x(sensorcoll,&de_oid,sensorlogcoll,info[28]);

   bson_t reply;
   bson_error_t error;
   time_t timep;
   time(&timep);
   query = bson_new ();
   BSON_APPEND_OID (query, "_id",&de_oid);
   bson_t *update ;
   update=BCON_NEW ("$set", "{", "update_time",BCON_DOUBLE(timep),"}");
   if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
   }
   bson_destroy (update);
   bson_destroy (query);


   mongoc_collection_destroy (collection);
   mongoc_collection_destroy (sensorcoll);
   mongoc_collection_destroy (sensorlogcoll);



}

void upperquery_f(unsigned char * info ,unsigned short usTemp_Length)
{  
   mongoc_collection_t *collection;
   mongoc_collection_t *sensorcoll;
   mongoc_collection_t *sensorlogcoll;
   collection = mongoc_client_get_collection (mgclient, "smart_trash_development", "devices");
   sensorcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensors");
   sensorlogcoll = mongoc_client_get_collection (mgclient, "smart_trash_development", "sensorlogs");
   mongoc_cursor_t *cursor;
   const bson_t *doc;
   bson_t *query;
   char *str;
   bson_oid_t de_oid;
   query = bson_new ();
   char phone[15];
   sprintf(phone,"%c%c%c%c%c%c%c%c%C%C%C%C%C%C%C",info[7],info[8],info[9],info[10],info[11],info[12],info[13],info[14],info[15],info[16],info[17],info[18],info[19],info[20],info[21]);
   BSON_APPEND_UTF8 (query, "device_sn", phone);
   printf("phone:%s\n",phone);

   cursor = mongoc_collection_find (collection, MONGOC_QUERY_NONE, 0, 0, 0, query, NULL, NULL);
   int ifind=0;
   while (mongoc_cursor_next (cursor, &doc)) {
          str = bson_as_json (doc, NULL);
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
                    bson_oid_copy(&value->value.v_oid,&de_oid);
                    char str1[25];
                    bson_oid_to_string (&value->value.v_oid, str1);
                    //printf("de_oid %s\n",str1);   
                    ifind=1;      
                 }
                 char str[25];
                 bson_oid_to_string (&value->value.v_oid, str);
                 //printf ("%s\n", str);
               }
            }
          }
   }

   bson_destroy (query);
   mongoc_cursor_destroy (cursor);
   if(ifind==0){
     bson_oid_t user_oid;
     bson_oid_init_from_string(&user_oid, "5757947e421aa9edf8000001");
     
     bson_t *sdoc = bson_new ();
     bson_oid_init (&de_oid, NULL);
     BSON_APPEND_OID (sdoc, "_id", &de_oid);
     BSON_APPEND_OID (sdoc, "user_id", &user_oid);
     BSON_APPEND_UTF8 (sdoc, "device_name", phone);
     BSON_APPEND_UTF8 (sdoc, "device_sn", phone);
     time_t timep;
     time(&timep);
     BSON_APPEND_TIME_T (sdoc, "create_time", timep);
     bson_error_t serror;
     if (!mongoc_collection_insert (collection, MONGOC_INSERT_NONE, sdoc, NULL, &serror)) {
        fprintf (stderr, "%s\n", serror.message);
     }
     bson_destroy (sdoc);
   }


   double lng;    
   lng =  ((unsigned long)info[35]<<24)+(info[36]<<16) + (info[37]<<8) + (info[38]); 
       //while(lng>100){
       //    lng =lng/10.0;
       //}
   lng=lng/100000.0;
        double lat;    
   lat =  ((unsigned long)info[41]<<24) +(info[42]<<16)+(info[43]<<8)+info[44]; 
   lat=lat/100000.0;
   lng=lng/60.0;
   lat=lat/60.0;
   printf("Lat:%lf,%lf\n",lng,lat);
   //
   double fLongitude;
   double fLatitude;
   fLongitude=info[34];
   fLongitude +=lng;
   fLatitude=info[40];
   fLatitude +=lat;
   printf("lng,lat:%lf,%lf\n",fLongitude,fLatitude);


   double prelng;    
   prelng =  ((unsigned long)info[53]<<24)+(info[54]<<16) + (info[55]<<8) + (info[56]); 
   prelng=prelng/100000.0;
        double prelat;    
   prelat =  ((unsigned long)info[59]<<24) +(info[60]<<16)+(info[61]<<8)+info[62]; 
   prelat=prelat/100000.0;
   prelng=prelng/60.0;
   prelat=prelat/60.0;
   printf("preLat:%lf,%lf\n",prelng,prelat);
   //
   double fpreLongitude;
   double fpreLatitude;
   fpreLongitude=info[52];
   fpreLongitude +=prelng;
   fpreLatitude=info[58];
   fpreLatitude +=lat;
   printf("perlng,prelat:%lf,%lf\n",fpreLongitude,fpreLatitude);

   unsigned long shift=0;
   
   shift =  ((unsigned long)info[63]<<24) +(info[64]<<16)+(info[65]<<8)+info[66]; 

   unsigned long Cur_Threshold=0;
   
   Cur_Threshold =  ((unsigned long)info[67]<<24) +(info[68]<<16)+(info[69]<<8)+info[70]; 

   bson_t reply;
   bson_error_t error;
   time_t timep;
   time(&timep);
   query = bson_new ();
   BSON_APPEND_OID (query, "_id",&de_oid);
   bson_t *update ;
   update=BCON_NEW ("$set", "{", "lon", BCON_DOUBLE(fLongitude), "lat",BCON_DOUBLE(fLatitude),"prelon", BCON_DOUBLE(fpreLongitude), "prelat",BCON_DOUBLE(fpreLatitude),"shift_time",BCON_DOUBLE(timep),"shift", BCON_INT32(shift),"threshold", BCON_INT32(Cur_Threshold),"}");
   if (!mongoc_collection_find_and_modify (collection, query, NULL, update, NULL, false, false, true, &reply, &error)) {
      fprintf (stderr, "find_and_modify() failure: %s\n", error.message);
   }
   bson_destroy (query);
   bson_destroy (update);
   //

   mongoc_collection_destroy (collection);
   mongoc_collection_destroy (sensorcoll);
   mongoc_collection_destroy (sensorlogcoll);


  

}

