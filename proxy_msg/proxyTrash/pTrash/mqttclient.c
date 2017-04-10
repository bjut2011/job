#include "mqttclient.h"
#define CLIENTID    "ExampleClientPub"
#define PAYLOAD     "Hello World!"

MQTTClient g_mqttclient=NULL;
int getRandom_t(int basicNum, int delta){
    time_t t;

    /* Intializes random number generator */
    srand((unsigned) time(&t));

    /* Get random number */
    int randInt = rand()%1000;
    double randDouble = (double)randInt/1000; // Get a number between 0~1
    randDouble = (randDouble - 0.5) * delta * 2 + basicNum; // Get a number betweem (basicNum-delta) and (basicNum+delta)

    int result = (int) randDouble;
    return result;
}


void getCurrentTime(char *timeString){
    time_t rawtime;
    struct tm *timePtr;

    time( &rawtime );

    timePtr = localtime( &rawtime );

    strftime(timeString, 80,"%Y-%m-%dT%XZ", timePtr);
}

MQTTClient  getMClient(){
   if(g_mqttclient){
      if(MQTTClient_isConnected(g_mqttclient)){
         return g_mqttclient;
      }else{
         MQTTClient_destroy(g_mqttclient);
         g_mqttclient=NULL;
      }
       
   }
   MQTTClient_connectOptions conn_opts = MQTTClient_connectOptions_initializer;
   MQTTClient_message pubmsg = MQTTClient_message_initializer;
   MQTTClient_deliveryToken token;
   int rc;

   MQTTClient_create(&g_mqttclient, ADDRESS, CLIENTID,
        MQTTCLIENT_PERSISTENCE_NONE, NULL);
    conn_opts.keepAliveInterval = 20;
    conn_opts.cleansession = 1;
    conn_opts.username = "device";
    conn_opts.password = "device";

    if ((rc = MQTTClient_connect(g_mqttclient, &conn_opts)) != MQTTCLIENT_SUCCESS)
    {
        printf("Failed to connect, return code %d\n", rc);
        //exit(-1);
        return NULL;
    }

   

}

const char* generateJsonForSimulation() {
    json_object *result = json_object_new_object();

    /*
      "metadata": {
          "type": "data"
      }
    */
    json_object *metadata = json_object_new_object();
    json_object *metaType = json_object_new_string("data");
    json_object_object_add(metadata,"type", metaType);
    json_object_object_add(result, "metadata", metadata);

    /*
      "scope": "UPS"
    */
    //json_object *scope = json_object_new_string("IotPortal");
    //json_object_object_add(result, "scope", scope);

    /*
    "source":
    {
        "operator": "UPS",
        "domainApplication": "$dispatcherApp",
        "gateway": "$cargoVin001"
    }
    */
    json_object *source = json_object_new_object();
    json_object *sourceOperator = json_object_new_string("CTBRI");
    json_object *sourceDomainApplication = json_object_new_string("CTBRI$smartGatewayApp");
    json_object *sourceGateway = json_object_new_string("CTBRI$smartTrashCan001");
    json_object_object_add(source,"operator", sourceOperator);
    json_object_object_add(source,"domainApplication", sourceDomainApplication);
    json_object_object_add(source,"gateway", sourceGateway);
    json_object_object_add(result,"source", source);

    /* contentNodes */
    json_object *contentNodes = json_object_new_array();
    json_object *contentNode1 = json_object_new_object();
    json_object *contentNode2 = json_object_new_object();

    /* contentNode1 */
    /*
    "metadata": {
                    "description": "temperature",
                    "logicalGroupId": "environment",
                    "logicalGroupDescription": "data type"
                }
    */
    json_object *contentNode1Metadata = json_object_new_object();
    json_object *description1 = json_object_new_string("temperature");
    json_object *logicalGroupId1 = json_object_new_string("environment");
    json_object *logicalGroupDescription1 = json_object_new_string("data type");
    json_object_object_add(contentNode1Metadata,"description", description1);
    json_object_object_add(contentNode1Metadata,"logicalGroupId", logicalGroupId1);
    json_object_object_add(contentNode1Metadata,"logicalGroupDescription", logicalGroupDescription1);
    //json_object_object_add(contentNode1, "metadata", contentNode1Metadata);

    /*
    "source": {
                    "resourceSpec": "UPS$temperatureResSpec"
              }
    */
    json_object *contentNode1Source = json_object_new_object();
    json_object *resourceSpec1 = json_object_new_string("CTBRI$uTodayDoorOpenTimesResSpec");
    json_object_object_add(contentNode1Source,"resourceSpec", resourceSpec1);
    json_object_object_add(contentNode1, "source", contentNode1Source);

    /*
        "value": 23.5
    */
    json_object *contentNode1Value = json_object_new_double(getRandom_t(23, 3));
    json_object_object_add(contentNode1, "value", contentNode1Value);

    /*
        "time": "2016-06-21T14:46:15Z"
    */
    char timeString[80];
	getCurrentTime(timeString);
	json_object *time = json_object_new_string(timeString);
	json_object_object_add(contentNode1, "time", time);

    /* contentNode2 */
	json_object *contentNode2Metadata = json_object_new_object();
    json_object *description2 = json_object_new_string("humidity");
    json_object *logicalGroupId2 = json_object_new_string("environment");
    json_object *logicalGroupDescription2 = json_object_new_string("data type");
    json_object_object_add(contentNode2Metadata,"description", description2);
    json_object_object_add(contentNode2Metadata,"logicalGroupId", logicalGroupId2);
    json_object_object_add(contentNode2Metadata,"logicalGroupDescription", logicalGroupDescription2);
    json_object_object_add(contentNode2, "metadata", contentNode2Metadata);

    json_object *contentNode2Source = json_object_new_object();
    json_object *resourceSpec2 = json_object_new_string("humidityResSpec");
    json_object_object_add(contentNode2Source,"resourceSpec", resourceSpec2);
    json_object_object_add(contentNode2, "source", contentNode2Source);

    json_object *contentNode2Value = json_object_new_double(getRandom_t(75, 5));
    json_object_object_add(contentNode2, "value", contentNode2Value);

    json_object_object_add(contentNode2, "time", time);


    json_object_array_add(contentNodes,contentNode1);
    //json_object_array_add(contentNodes,contentNode2);
    json_object_object_add(result,"contentNodes", contentNodes);

    const char *stringResult = json_object_to_json_string(result);
    return stringResult;
}
