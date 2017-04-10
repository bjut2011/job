#include <stdio.h>
#include <netinet/in.h>
int main()
{
 	    int i_num = 33;
            printf("%d\n",sizeof(int));
 	    printf("[0]:0x%x\n", *((char *)&i_num + 0));
 	    printf("[1]:0x%x\n", *((char *)&i_num + 1));
 	 
 	    i_num = htonl(i_num);
 	    printf("[4]:0x%x\n", *((char *)&i_num + 3));
 	    printf("[3]:0x%x\n", *((char *)&i_num + 2));
 	 
 	    return 0;
 	} 
