#ifndef _GPS_H_
#define _GPS_H_
#include <iconv.h>  
#include <stdlib.h>  
#include <stdio.h>  
#include <unistd.h>  
#include <fcntl.h>  
#include <string.h>  
#include <sys/stat.h> 
#include <math.h> 

typedef struct {double lat, lng; } POINT;
 int is_inside(POINT poly[],int NN, POINT q);
 void gtransform(double wgLat, double wgLon, double *mgLatLon);
 int outOfChina(double lat, double lon);

 double transformLat(double x, double y);
 double transformLon(double x, double y);

 void bd_encrypt(double gg_lat, double gg_lon, double* bd_latlon);

 double radian(double d);
 double get_distance(double lat1, double lng1, double lat2, double lng2);


#endif
