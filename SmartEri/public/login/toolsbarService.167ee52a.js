!function(){"use strict";var e=angular.module("toolsBarModule",[]);e.service("toolsBarService",["$state","$stateParams","$http","$q","httpService","configService","mAlert",function(e,a,t,r,s,o,i){function d(){w.chooseNothing();var e=a.id;null!=w.nowMailID&&w.setNowMail(e),w.inMail&&w.spareBar&&w.ids.push(e)}function n(){w.allChoose=!w.allChoose,w.ids=[];for(var e=0,a=w.list.length;a>e;e++)for(var t,r=0,s=w.list[e].mails.length;s>r;r++)t=w.list[e].mails,t[r].choosed=w.allChoose,w.allChoose&&w.ids.push(t[r].id)}function l(e){return e?function(){w.ids=[],w.allChoose=!0;for(var e in w.list){var a;for(var t in a=w.list[e].mails)a[t].choosed=!0,w.ids.push(a[t].id)}}:function(){w.ids=[],w.allChoose=!1;for(var e in w.list){var a;for(var t in a=w.list[e].mails)a[t].choosed=!1}}}function m(e){return e?function(){w.ids=[];for(var e in w.list){var a;for(var t in a=w.list[e].mails)a[t].hasRead?(a[t].choosed=!0,w.ids.push(a[t].id)):a[t].choosed=!1}}:function(){w.ids=[];for(var e in w.list){var a;for(var t in a=w.list[e].mails)a[t].hasRead?a[t].choosed=!1:(a[t].choosed=!0,w.ids.push(a[t].id))}}}function u(){var t=w.orderIds.indexOf(1*a.id),r=w.orderIds[t+1]||w.orderIds[t-1];w.orderIds.splice(t,1),g(),w.orderIds.length?e.go(e.$current.name,{id:r}):e.go(e.$current.name.replace(".mail",""))}function c(e,a,t){var r=function(){t||i.msg({type:"success",msg:"操作成功"});for(var r in w.list){var s;for(var n in s=w.list[r].mails)-1!=w.ids.indexOf(s[n].id)&&(s[n][e]=a)}o.getFolderListData(),d()};return r}function p(e){return function(t){0==e?i.msg({type:"success",msg:"操作成功"}):i.msg({type:"success",msg:"举报成功"}),o.getFolderListData(),w.getList(a.searchText,w.nowSortType)}}function h(){i.msg({type:"error",msg:"操作失败，请稍后重试！"}),d()}function g(e,a){var t;a=a||"timeUpToDown",w.nowSortType=a,0==o.foldersLength?(t=o.getFolderListData(),t.then(function(t){f(e,a)})):f(e,a)}function f(e,a){w.listNum?v(e,a):(o.getBaseSet(function(){w.listNum=o.baseSet.pageCount,v(e,a)}),w.listNum=10)}function v(a,r){var s;if(w.listNum=o.baseSet.pageCount,a)s="search?words="+encodeURIComponent(a)+"&offset="+w.listNum*(w.nowPage-1)+"&limit="+w.listNum+"&"+w.sortType[r];else{var n=y();if(!n)return void i.alert({title:"提示",body:"系统错误，请刷新重试"});s="getList?offset="+w.listNum*(w.nowPage-1)+"&limit="+w.listNum+"&folderId="+n+"&"+w.sortType[r]}t.get(s).success(function(a){if(200==a.status){if(w.list=[],0==a.data.total)return void(w.emptyListFlag=!0);w.emptyListFlag=!1,w.originMails=a.data.list,w.list=M(w.originMails,w.nowSortType),w.list.length||(w.spareBar=!0,w.inMail=!1),w.total=Math.ceil(a.data.total/w.listNum),w.key=a.data.key,w.pages={value:w.nowPage,id:"pages",direction:!0,list:[]};for(var t=1;t<=w.total;t++)w.pages.list.push(t);w.FROM_PREMAIL?(e.go(e.$current.name,{id:w.orderIds[w.orderIds.length-1]}),w.FROM_PREMAIL=!1):w.FROM_NEXTMAIL&&(e.go(e.$current.name,{id:w.orderIds[0]}),w.FROM_NEXTMAIL=!1),d(),w.MailGrayFlag(),w.mailListScope&&setTimeout(function(){w.mailListScope.$emit("scrollbar",{flag:"maillist",scrollEvent:"update"}),w.mailListScope.$emit("scrollbar",{flag:"maillist",scrollEvent:"scrollTo",scrollTo:"top"})},100)}})}function y(){var t,r=e.$current.name.replace(/\.mail/,"");return t="other"!=r&&"multiMails"!=r?void 0!=o.mailFolders[r]?o.mailFolders[r].folder_id:"":a.folderId}function M(a,t){var r=new Date,s=r.pattern("yyyy-MM-dd");r.setDate(r.getDate()-1);for(var o=r.pattern("yyyy-MM-dd"),i=[{date:"今天",mails:[]},{date:"昨天",mails:[]},{date:"更早",mails:[]},{date:"",mails:[]}],d=0,n=a.length;n>d;d++){var l="";a[d].subject=a[d].subject||"(无主题)",~t.indexOf("size")||"draft"===e.$current.name.replace(/\.mail/,"")?i[3].mails.push(a[d]):(a[d].receivedDate&&(l=a[d].receivedDate.slice(0,10).trim()),a[d].choosed=!1,l==s?i[0].mails.push(a[d]):l==o?i[1].mails.push(a[d]):i[2].mails.push(a[d]))}return w.orderIds=S(i),"timeDownToUp"===t&&i.reverse(),i}function S(e){var a=[],t=[];for(var r in e)a=a.concat(e[r].mails);for(var s=a.length,r=0;s>r;r++)a[r]&&t.push(a[r].id);return t}var w=this;w.searchText="",w.spareBar=!0,w.listHide=!1,w.inMail=!1,w.detail=!1,w.allChoose=!1,w.ids=[],w.list=[],w.orderIds=[],w.stateParams=a,w.prevMailGrayFlag=!1,w.nextMailGrayFlag=!1,w.multiMailsClickFlag=!1,w.multiMailsShowFlag=!1,w.otherClickFlag=!1,w.otherShowFlag=!1,w.mailListScope="",w.listNum=null,w.nowPage=1,w.nowMailID=null,w.originMails=[],w.FROM_PREMAIL=!1,w.FROM_NEXTMAIL=!1,w.nowMail=null,w.key=[],w.getFolderId=y,w.total=0,w.emptyListFlag=!1,w.sortType={timeUpToDown:"order=id&sort=0",timeDownToUp:"order=id&sort=1",sizeUpToDown:"order=size&sort=0",sizeDownToUp:"order=size&sort=1"},w.nowSortType="timeUpToDown",w.TOOLS_ACTION_CONFIG={unread:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{recv:!0,send:!0,"delete":!0,spam:!0}},recv:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{recv:!1,send:!0,"delete":!0,spam:!0}},send:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{recv:!0,send:!1,"delete":!0,spam:!0}},starmail:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{recv:!0,send:!0,"delete":!0,spam:!0}},"delete":{"delete":{del:!1,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!1,unMarkStar:!1},move:{recv:!0,send:!0,"delete":!1,spam:!0}},spam:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!1,unMarkStar:!1},move:{recv:!0,send:!0,"delete":!0,spam:!1}},other:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{recv:!0,send:!0,"delete":!0,spam:!0}},multiMails:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{recv:!0,send:!0,"delete":!0,spam:!0}},draft:{"delete":{del:!0,destory:!0,destoryReport:!1},mark:{hide:!0,hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{hide:!0,recv:!0,send:!0,"delete":!0,spam:!0}},searchMail:{"delete":{del:!0,destory:!0,destoryReport:!0},mark:{hide:!0,hasRead:!0,unread:!0,markStar:!0,unMarkStar:!0},move:{hide:!0,recv:!0,send:!0,"delete":!0,spam:!0}}},w.chooseAllToggle=n,w.chooseAll=l(!0),w.chooseNothing=l(!1),w.unRead=m(!1),w.hasRead=m(!0),w.getList=g,w.pages={value:1,id:"pages",direction:!0,list:[]},w.MailGrayFlag=function(){w.stateParams.id?(w.prevMailGrayFlag=1==w.nowPage&&0===w.orderIds.indexOf(Number(w.stateParams.id)),w.nextMailGrayFlag=w.nowPage==w.total&&w.orderIds.indexOf(Number(w.stateParams.id))===w.orderIds.length-1):(w.prevMailGrayFlag=!0,w.nextMailGrayFlag=!0)},w.prePage=function(t){1!=w.nowPage&&(w.nowPage-=1,w.getList(a.searchText,w.nowSortType),t&&(e.go(e.$current.name.replace(/\.mail/,"")),w.nowMailID=null))},w.nextPage=function(t){w.nowPage!=w.total&&(w.nowPage+=1,w.getList(a.searchText,w.nowSortType),t&&(e.go(e.$current.name.replace(/\.mail/,"")),w.nowMailID=null))},w.sort=function(e){w.nowSortType=e,w.getList(a.searchText,e)},w.apiWithMails=function(e,r,s,o,i){var d={markRead:{api:"markRead",method:"post",data:"ids="+w.ids.join(",")+"&read="+o,successHandle:function(e){c("hasRead",o,i)(e);var t=a.searchText||"";g(t,w.nowSortType)}},markReadFromUnreadSpareBar:{api:"markRead",method:"post",data:"ids="+w.ids.join(",")+"&read="+o,successHandle:function(e){c("hasRead",o,i)(e)}},markStar:{api:"markStar",method:"post",data:"ids="+w.ids.join(",")+"&star="+o,successHandle:function(e){c("star",o,i)(e),g("",w.nowSortType)}},moveToFolder:{api:"moveFolder",method:"post",data:"ids="+w.ids.join(",")+"&from="+r+"&to="+s,successHandle:function(e){p(o?o:0)(e),a.id&&u()}},del:{api:"del",method:"delete",data:"ids="+w.ids.join(",")+"&folderId="+r+"&spamType="+(o?o:0),successHandle:function(e){p(o?o:0)(e),a.id&&u()}}};t({method:d[e].method,data:d[e].data,headers:{"Content-Type":"application/x-www-form-urlencoded"},url:d[e].api}).success(function(a){200==a.status?d[e].successHandle(a.data):0!=i&&void 0!=i||h()}).error(h)},w.setNowMail=function(e){for(var a in w.originMails)if(w.originMails[a].id==e){w.nowMail=w.originMails[a];break}},w.receipt=function(e,a){return function(){t({method:"put",url:"disposition?mailId="+e,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"}}).success(function(e){200==e.status?a():i.msg({type:"error",msg:"操作失败，请稍后重试！"})}).error(function(){i.msg({type:"error",msg:"操作失败，请稍后重试！"})})}}}])}();