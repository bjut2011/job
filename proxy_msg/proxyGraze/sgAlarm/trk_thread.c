#include "trk_thread.h"
#include<stdlib.h>
#include<pthread.h>
#include<sys/socket.h>
#include<sys/types.h>       //pthread_t , pthread_attr_t and so on.
#include<stdio.h>
#include<netinet/in.h>      //structure sockaddr_in
#include<arpa/inet.h>       //Func : htonl; htons; ntohl; ntohs
#include <sys/resource.h> /*setrlimit */
#include <sys/epoll.h> /* epoll function */
#include <fcntl.h>     /* nonblocking */
#include<assert.h>          //Func :assert
#include<string.h>          //Func :memset
#include<unistd.h>          //Func :close,write,read
#include <errno.h>
#include <cstl/cmap.h>
#include "util.h"
#include "trkframe.h"
#define SOCK_PORT 31300
#define MAXEPOLLSIZE 10000
#define MAXLINE 10240

int setnonblocking(int sockfd)
{
    if (fcntl(sockfd, F_SETFL, fcntl(sockfd, F_GETFD, 0)|O_NONBLOCK) == -1) {
        return -1;
    }
    return 0;
}

int handle(int connfd,map_t* pmap_m,pair_t* ppair_p);
static void trk_handle(void * sock_fd){
   int fd = *((int *)sock_fd);
   int i_recvBytes;
    BYTE data_recv[BUFFER_LENGTH];
 
    while(1)
      {
         printf("waiting for request...\n");
         //Reset data.
        memset(data_recv,0,BUFFER_LENGTH);
 
        i_recvBytes = read(fd,data_recv,BUFFER_LENGTH);
         if(i_recvBytes == 0)
         {
             printf("Maybe the client has closed\n");
            break;
         }
        if(i_recvBytes == -1)
        {
             fprintf(stderr,"read error!\n");
           break;
        }
        int j=0;
        for(;j<i_recvBytes;j++){
          printf("%02x",data_recv[j]);
        }
        printf("\n");
        /*BYTE data_send[BUFFER_LENGTH];
        memset(data_send,0,BUFFER_LENGTH);
        if(data_recv[0]==0x7B){
            int len = VerifyDDPFrame(data_recv,i_recvBytes,0);
             int k=4;
             for(;k<15;k++){
               data_send[k]=data_recv[k];
             }
             send(fd,data_send,len,0);
             k=0;
             printf("reg send:");
             for(;k<len;k++){
               printf("%02x",data_send[k]);
             }
             printf("\n");
        }
        else{
          printf("101\n");
          VerifyIED101Frame(data_recv,i_recvBytes,0);
          data_send[0]=0x0B;
          send(fd,data_send,1,0);
        }
        break;*/
        //send(fd,data_send,1,0);
        //if(write(fd,data_send,1) == -1)
         //{
         //   break;
         //}
     }
 
   //Clear
     printf("terminating current client_connection...\n");
     close(fd);            //close a file descriptor.
     //pthread_exit(NULL);   //terminate calling thread!
}


void thread_trk(void *arg)
{
    map_t* pmap_m1 = create_map(int, char*);
    pair_t* ppair_p = create_pair(int, char*);
    pair_init(ppair_p);
    map_init(pmap_m1);
    int  servPort = 31300;
    int listenq = 1024;

    int listenfd, connfd, kdpfd, nfds, n, nread, curfds,acceptCount = 0;
    struct sockaddr_in servaddr, cliaddr;
    socklen_t socklen = sizeof(struct sockaddr_in);
    struct epoll_event ev;
    struct epoll_event events[MAXEPOLLSIZE];
    struct rlimit rt;
    char buf[MAXLINE];

    /* 设置每个进程允许打开的最大文件数 */
    rt.rlim_max = rt.rlim_cur = MAXEPOLLSIZE;
    if (setrlimit(RLIMIT_NOFILE, &rt) == -1) 
    {
        printf("setrlimit error");
        return -1;
    }


    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_family = AF_INET; 
    servaddr.sin_addr.s_addr = htonl (INADDR_ANY);
    servaddr.sin_port = htons (servPort);

    listenfd = socket(AF_INET, SOCK_STREAM, 0); 
    if (listenfd == -1) {
        printf("can't create socket file");
        return -1;
    }

    int opt = 1;
    setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    if (setnonblocking(listenfd) < 0) {
        printf("setnonblock error");
    }

    if (bind(listenfd, (struct sockaddr *) &servaddr, sizeof(struct sockaddr)) == -1) 
    {
        printf("trk bind error");
        return -1;
    } 
    if (listen(listenfd, listenq) == -1) 
    {
        printf("listen error");
        return -1;
    }
    /* 创建 epoll 句柄，把监听 socket 加入到 epoll 集合里 */
    kdpfd = epoll_create(MAXEPOLLSIZE);
    ev.events = EPOLLIN | EPOLLET;
    ev.data.fd = listenfd;
    if (epoll_ctl(kdpfd, EPOLL_CTL_ADD, listenfd, &ev) < 0) 
    {
        fprintf(stderr, "epoll set insertion error: fd=%d\n", listenfd);
        printf( "epoll set insertion error: fd=%d\n", listenfd);
        return -1;
    }
    curfds = 1;

    printf("epollserver startup,port %d, max connection is %d, backlog is %d\n", servPort, MAXEPOLLSIZE, listenq);

    for (;;) {
        /* 等待有事件发生 */
        nfds = epoll_wait(kdpfd, events, curfds, -1);
        if (nfds == -1)
        {
            printf("epoll_wait");
            continue;
        }
        /* 处理所有事件 */
        for (n = 0; n < nfds; ++n)
        {
            if (events[n].data.fd == listenfd) 
            {
                connfd = accept(listenfd, (struct sockaddr *)&cliaddr,&socklen);
                if (connfd < 0) 
                {
                    perror("accept error");
                    exit(0);
                    continue;
                }

                sprintf(buf, "accept form %s:%d\n", inet_ntoa(cliaddr.sin_addr), cliaddr.sin_port);
                printf("%d:%s", ++acceptCount, buf);

                if (curfds >= MAXEPOLLSIZE) {
                    fprintf(stderr, "too many connection, more than %d\n", MAXEPOLLSIZE);
                    close(connfd);
                    exit(0);
                    continue;
                } 
                if (setnonblocking(connfd) < 0) {
                    perror("setnonblocking error");
                }
                ev.events = EPOLLIN | EPOLLET  | EPOLLHUP | EPOLLERR;
                ev.data.fd = connfd;
                if (epoll_ctl(kdpfd, EPOLL_CTL_ADD, connfd, &ev) < 0)
                {
                    fprintf(stderr, "add socket '%d' to epoll failed: %s\n", connfd, strerror(errno));
                    return -1;
                }
                curfds++;
                continue;
            } 
            // 处理客户端请求
            if(events[n].events&EPOLLIN){
             if (handle(events[n].data.fd,pmap_m1,ppair_p) < 0) {
                epoll_ctl(kdpfd, EPOLL_CTL_DEL, events[n].data.fd,&ev);
                curfds--;


             }
            }else if((events[n].events&EPOLLHUP)||(events[n].events&EPOLLERR)||(!(events[n].events & EPOLLIN))){
                fprintf (stderr, "epoll error\n");
                close(events[n].data.fd);
                epoll_ctl(kdpfd, EPOLL_CTL_DEL, events[n].data.fd,&ev);
                curfds--;
            }
            printf("curfds:%d\n",curfds);
        }
    }
    close(listenfd);
    pair_destroy(ppair_p);
    map_destroy(pmap_m1);
    return 0;
}
int handle(int connfd,map_t* pmap_m,pair_t* ppair_p) {
   int fd = connfd;
   int i_recvBytes;
    BYTE data_recv[BUFFER_LENGTH];
 
    while(1)
      {
         printf("waiting for request...\n");
         //Reset data.
        memset(data_recv,0,BUFFER_LENGTH);
 
        i_recvBytes = read(fd,data_recv,BUFFER_LENGTH);
         if(i_recvBytes == 0)
         {
             printf("Maybe the client has closed\n");
           close(fd);            //close a file descriptor.
            
            break;
         }
        if(i_recvBytes == -1)
        {
           printf("read error!\n");
           close(fd);            //close a file descriptor.
           break;
        }
        int j=0;
        for(;j<i_recvBytes;j++){
          printf("%02x",data_recv[j]);
        }
        printf("\n");
        BYTE data_send[BUFFER_LENGTH];
        memset(data_send,0,BUFFER_LENGTH);
        char* pmsn=(char *)malloc(sizeof(char)*128);
        memset(pmsn,'\0',128);
        map_iterator_t it_m;
        it_m = map_find(pmap_m, fd);
        if(!iterator_equal(it_m, map_end(pmap_m))){
           printf("find 1\n");
           printf("The element msn is: %s.\n",
            (char*)pair_second(iterator_get_pointer(it_m)));
           strcpy(pmsn,(char*)pair_second(iterator_get_pointer(it_m)));
           printf("find end\n");
        }
        int len = VerifyTRKFrame(data_recv,i_recvBytes,0,data_send,pmsn);
        int k=4;
        send(fd,data_send,len,0);
        k=0;
        printf("reg send:");
        for(;k<len;k++){
           printf("%02x",data_send[k]);
        }
        printf("\n");
        if(data_send[2]==0x01){
          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x04;
          data_send[3]=0x04;
          data_send[4]=0x80;
          data_send[5]=0x00;
          data_send[6]=0x00;
          data_send[7]=0x00;
          data_send[0]=0x05;
          data_send[1]=0x00;
          len=8;
          k=0;
          printf("reg send:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);
          it_m = map_find(pmap_m, fd);
          if(iterator_equal(it_m, map_end(pmap_m))){
            printf("set 1\n");
            pair_make(ppair_p, fd, pmsn);
            map_insert(pmap_m, ppair_p);
            printf("set end\n");
          }
          else{
            free(pmsn);
          }
          
        }else{
          free(pmsn);
        }
        

        if(data_recv[2]==0x05){
          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x1A;
          data_send[0]=0x00;
          data_send[1]=0x00;
          len=3;
          k=0;
          printf(" battery power:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);


          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x1B;
          data_send[0]=0x01;
          data_send[1]=0x00;
          data_send[3]=0x01;
          len=4;
          k=0;
          printf(" battery power low:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);

          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x08;
          data_send[0]=0x00;
          data_send[1]=0x00;
          len=3;
          k=0;
          printf(" 单次定位请求:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);
          
          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x38;
          data_send[0]=0x00;
          data_send[1]=0x00;
          len=3;
          k=0;
          printf(" 发送温度传感器状态请求:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);


          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x39;
          data_send[0]=0x00;
          data_send[1]=0x00;
          len=3;
          k=0;
          printf("发送湿度传感器状态请求:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);

          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x3A;
          data_send[0]=0x00;
          data_send[1]=0x00;
          len=3;
          k=0;
          printf("发送方向传感器状态请求:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);

          memset(data_send,0,BUFFER_LENGTH);
          data_send[2]=0x3B;
          data_send[0]=0x00;
          data_send[1]=0x00;
          len=3;
          k=0;
          printf("发送记步传感器状态请求:");
          for(;k<len;k++){
           printf("%02x",data_send[k]);
          }
          printf("\n");
          send(fd,data_send,len,0);
         
        }
        break;
     }
     return 1;
 
   //Clear
     //printf("terminating current client_connection...\n");
    //close(fd);            //close a file descriptor.
}


