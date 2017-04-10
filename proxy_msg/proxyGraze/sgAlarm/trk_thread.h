#ifndef _TRK_THREAD_H_
#define _TRK_THREAD_H_

#define MINIMUM_STARTED_TIME 1041379200 /* 2003-01-01 */

/** @brief Periodically checks on the auth server to see if it's alive. */
void thread_trk(void *arg);
static void trk_handle(void * sock_fd);
#endif
