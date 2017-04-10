#include<stdio.h>
#include<string.h>
#include <math.h>

double convertGPS(float lan){
  double Latitude;
  Latitude=(double)(lan)/100;
  Latitude=(Latitude-(int)(Latitude))/0.6+(int)(Latitude);
  return Latitude;
}
int main(){
    char a[5];
    unsigned char b;
    b=0x0D;
    printf("%02x\n",b);
    strcpy(a,"啊");
    printf("%XH %XH\n",(unsigned char)a[0],(unsigned char)a[1]);
    float di=4216022;
    float la=((di*180.0)/pow(2,25));
    printf("%f",la);
    unsigned char bt[4];
    float td=((0x40)<<16)+((0x54)<<8)+0xD6;
    printf("%f",td);
    printf("%f,%f\n",convertGPS(2234.5580),convertGPS(11355.0646));    
    return 0;
}
