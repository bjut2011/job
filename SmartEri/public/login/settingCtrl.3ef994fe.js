!function(){"use strict";var e=angular.module("SettingModule",[]);e.controller("setBasicCtrl",["$scope","$state","httpService","configService","mAlert",function(e,t,n,i,a){e.footer={firstButton:"保存"},e.options={},i.baseSet&&i.baseSet.pageCount?(e.options.httpsFilter=i.baseSet.httpsFilter,e.options.autoSaveContact=i.baseSet.autoSaveContact,e.options.autoSaveInterval=i.baseSet.autoSaveInterval,e.options.sessionMode=i.baseSet.sessionMode,e.options.showSenderAddr=i.baseSet.showSenderAddr,e.options.replyPrefix=i.baseSet.replyPrefix,e.options.includeOrigin=i.baseSet.includeOrigin,e.options.pageCount=i.baseSet.pageCount):n.baseSet.get().then(function(t){200==t.status&&(e.options.httpsFilter=t.data.httpsFilter||!!t.data.httpsFilter,e.options.autoSaveContact=t.data.autoSaveContact,e.options.autoSaveInterval=t.data.autoSaveInterval||3,e.options.sessionMode=t.data.sessionMode||!!t.data.sessionMode,e.options.showSenderAddr=t.data.showSenderAddr,e.options.replyPrefix=t.data.replyPrefix||"回复:",e.options.includeOrigin=t.data.includeOrigin||!!t.data.includeOrigin,e.options.pageCount=t.data.pageCount||20)});var s=!0;e.saveFun=function(){s=!1,n.baseSet.set(e.options).then(function(n){200==n.status?(i.baseSet=e.options,a.msg({type:"success",msg:"保存成功"}),i.getBaseSet(),t.go("setting")):a.msg({type:"error",msg:"操作失败，请稍后重试！"}),s=!0})},e.changeOption=function(t,n){e.options[t]=n}}]),e.controller("setAddresserInfoCtrl",["$scope","$state","httpService","configService","setPublicMethod","mAlert",function(e,t,n,i,a,s){var o=a.getUserId(),r=o.slice(0,o.indexOf("@"));e.options={},n.setAddresserInfo.get().then(function(t){200==t.status&&(e.options.displayName=t.data.displayName||r,e.options.replyAddr=t.data.replyAddr||o)}),e.footer={};var l=!0;e.saveFun=function(){return e.options.replyAddr&&!e.options.replyAddr.isMail()?(s.msg({type:"error",msg:"邮箱格式不正确"}),!1):(e.options.replyAddr||(e.options.replyAddr=o),e.options.displayName||(e.options.displayName=r),l=!1,void n.setAddresserInfo.set(e.options).then(function(e){200==e.status?(s.msg({type:"success",msg:"保存成功"}),i.getUserData(),t.go("setting")):s.msg({type:"error",msg:"操作失败，请稍后重试！"}),l=!0}))}}]),e.controller("setAutoreplyCtrl",["$scope","httpService","setTimeService","timeFunction","mAlert","setPublicMethod","configService","$interval",function(e,t,n,i,a,s,o,r){function l(){t.setAutoreply.bindQuery().then(function(t){200===Number(t.status)&&(e.bindOption.count=t.data.count,e.bindOption.showPhone=t.data.mobile,e.bindOption.countFlag=!0,e.bindOption.count||(e.bindOption.grayFlag=!0))})}function c(t){200===Number(t.status)&&l(),403===Number(t.status)&&(e.bindOption.message="手机号码已被绑定，若有问题请联系客服热线： 010-58103760",e.bindOption.showMsgFlag=!0),406!==Number(t.status)&&412!==Number(t.status)||(e.bindOption.message="请求次数过多",e.bindOption.showMsgFlag=!0)}e.showreminder="",e.setStratYear=n.startYear,e.setEndYear=n.endYear,e.setStratMonth=n.startMonth,e.setEndMonth=n.endMonth,e.setStratDay=n.stratDay,e.setEndDay=n.endDay,e.emailText=s.getUserId(),e.footer={functionName:"setAutoreplyInfo",firstButton:"保存"},e.options={autoReply:!0,startDate:"",endDate:"",replyContent:"",forward:!0,forwardAddr:"",forwardSave:!0,captcha:""},e.configService=o,e.bindOption={showPhone:"",msgCaptcha:"",bindPhone:"",count:"",countFlag:!1,showMsgFlag:!1,message:"请输入正确的手机号",grayFlag:!1,submitMsg:"",errorPhoneFlag:!1,contentCaptcha:"获取验证码"},l(),e.showErrorMsg=function(){e.bindOption.errorPhoneFlag=!0},e.getcaptcha=function(n){if(e.bindOption.showMsgFlag=!1,!e.bindOption.grayFlag){if(n)t.setAutoreply.getVerCode().then(function(e){c(e)});else{if(!s.checkPhone(e.bindOption.bindPhone))return e.bindOption.message="请输入正确的手机号",e.bindOption.showMsgFlag=!0,!1;t.setAutoreply.getVerCode({bindPhone:e.bindOption.bindPhone}).then(function(e){c(e)})}var i=60;e.bindOption.grayFlag=!0,e.bindOption.contentCaptcha="剩余"+i+"s";var a=r(function(){e.bindOption.contentCaptcha="剩余"+i+"s",i--,i||(e.bindOption.contentCaptcha="获取验证码",r.cancel(a),e.bindOption.grayFlag=!1)},1e3)}},e.$watch("bindOption.msgCaptcha",function(t,n,i){e.bindOption.msgCaptcha=s.checkNum(t)}),e.$watch("bindOption.bindPhone",function(t,n,i){e.bindOption.bindPhone=s.checkNum(t)}),t.setAutoreply.get().then(function(t){if(200==t.status){e.options=t.data,e.options.autoReply||(e.setStratYear.click=!0,e.setEndYear.click=!0,e.setStratMonth.click=!0,e.setEndMonth.click=!0,e.setStratDay.click=!0,e.setEndDay.click=!0);var s=i.oTimeArr(e.options.startDate),o=i.oTimeArr(e.options.endDate,!0);e.setStratYear.value=s[0],e.setEndYear.value=o[0],e.setStratMonth.value=s[1],e.setEndMonth.value=o[1],e.setStratDay.value=s[2],e.setEndDay.value=o[2],e.$watch("setStratYear.value",function(t,s,o){var r=i.formatTime(e.setStratYear.value,e.setStratMonth.value,e.setStratDay.value),l=i.formatTime(e.setEndYear.value,e.setEndMonth.value,e.setEndDay.value);n.setDateMessage(e,i.getDateValue(r,l),a);var c=i.getDayListAndDay(r);c&&(e.setStratDay.list=c.list,e.setStratDay.value=c.value)}),e.$watch("setStratMonth.value",function(t,s,o){var r=i.formatTime(e.setStratYear.value,e.setStratMonth.value,e.setStratDay.value),l=i.formatTime(e.setEndYear.value,e.setEndMonth.value,e.setEndDay.value);n.setDateMessage(e,i.getDateValue(r,l),a);var c=i.getDayListAndDay(r);c&&(e.setStratDay.list=c.list,e.setStratDay.value=c.value)}),e.$watch("setStratDay.value",function(t,s,o){var r=i.formatTime(e.setStratYear.value,e.setStratMonth.value,e.setStratDay.value),l=i.formatTime(e.setEndYear.value,e.setEndMonth.value,e.setEndDay.value);n.setDateMessage(e,i.getDateValue(r,l),a)}),e.$watch("setEndYear.value",function(t,s,o){var r=i.formatTime(e.setStratYear.value,e.setStratMonth.value,e.setStratDay.value),l=i.formatTime(e.setEndYear.value,e.setEndMonth.value,e.setEndDay.value);n.setDateMessage(e,i.getDateValue(r,l),a);var c=i.getDayListAndDay(l);c&&(e.setEndDay.list=c.list)}),e.$watch("setEndMonth.value",function(t,s,o){var r=i.formatTime(e.setStratYear.value,e.setStratMonth.value,e.setStratDay.value),l=i.formatTime(e.setEndYear.value,e.setEndMonth.value,e.setEndDay.value);n.setDateMessage(e,i.getDateValue(r,l),a);var c=i.getDayListAndDay(l);c&&(e.setEndDay.list=c.list)}),e.$watch("setEndDay.value",function(t,s,o){var r=i.formatTime(e.setStratYear.value,e.setStratMonth.value,e.setStratDay.value),l=i.formatTime(e.setEndYear.value,e.setEndMonth.value,e.setEndDay.value);n.setDateMessage(e,i.getDateValue(r,l),a)})}}),e.changeOption=function(t,n){"forwardSave"===t?e.options.forward&&(e.options[t]=n):e.options[t]=n,"autoReply"===t&&(n?(e.setStratYear.click=!1,e.setEndYear.click=!1,e.setStratMonth.click=!1,e.setEndMonth.click=!1,e.setStratDay.click=!1,e.setEndDay.click=!1):(e.setStratYear.click=!0,e.setEndYear.click=!0,e.setStratMonth.click=!0,e.setEndMonth.click=!0,e.setStratDay.click=!0,e.setEndDay.click=!0))},e.change=function(){e.options.forwardAddr=s.filterMail(e.options.forwardAddr)}}]),e.controller("setWhiteListCtrl",["$scope","httpService","setPublicMethod","mAlert",function(e,t,n,i){function a(n,a){t.whiteList.addWhite({email:n}).then(function(t){t.status&&(a&&e.blacklists.splice(a,a),e.lists.unshift({value:n}),e.emailText="",s(),i.msg({type:"success",msg:"添加成功"}))})}function s(){setTimeout(function(){e.$emit("scrollbar",{flag:"whitelist",scrollEvent:"update"})},100)}e.lists=[],e.blacklists=[],e.footer={functionName:"",firstButton:"保存",preview:!0},e.emailText="",t.whiteList.getList(function(t){var n=t.white;e.blacklists=t.black;var i=[];if(e.lists=[],n&&n.length>0){for(var a=0,o=n.length;o>a;a++)!function(e){i.push({value:n[e].email})}(a);e.lists=i}s()},function(e){}),e.deleteList=function(n){i.alert({title:"提示",body:"您确定要删除这条白名单吗？",btns:[{"class":"btn-sure",classmore:"btn-lg",text:"确定",cb:function(){for(var a=0,o=e.lists.length;o>a;a++)if(e.lists[a].value===n){t.whiteList.rmWhite({email:n}).then(function(t){e.lists.splice(a,1),i.msg({type:"success",msg:"删除成功"}),s()},function(e){});break}}},{"class":"btn-cancle",text:"取消"}]})},e.addAddress=function(){var t=!1,s=e.emailText.trim();if(!s)return i.msg({type:"error",msg:"输入内容不能为空"}),!1;if(n.mailVerify(s)||n.regionVerify(s)){for(var o=!1,r=0;r<e.lists.length;r++)e.lists[r].value===s&&(o=!0);if(o)i.msg({type:"error",msg:"白名单中已经存该地址"});else{for(var l=0,c=e.blacklists.length;c>l;l++)if(e.blacklists[l].email===s){t=!0;break}t?i.alert({title:"提示",body:"该邮箱地址或域在黑名单中，确定要加入白名单吗？",btns:[{"class":"btn-sure",classmore:"btn-lg",text:"确定",cb:function(){a(s,l)}},{"class":"btn-cancle",text:"取消"}]}):a(s)}}else i.msg({type:"error",msg:"请输入正确的格式！"})}}]),e.controller("setBlackListCtrl",["$scope","httpService","setPublicMethod","mAlert",function(e,t,n,i){function a(n,a){t.blackList.addBlack({email:n}).then(function(t){t.status&&(a&&e.whitelists.splice(a,a),e.lists.unshift({value:n}),e.emailText="",s(),i.msg({type:"success",msg:"添加成功"}))})}function s(){setTimeout(function(){e.$emit("scrollbar",{flag:"blacklist",scrollEvent:"update"})},100)}e.lists=[],e.footer={functionName:"",firstButton:"保存",preview:!0},e.whitelists=[],e.emailText="",t.blackList.getList(function(t){var n=t.black;e.whitelists=t.white;var i=[];if(n&&n.length>0){for(var a=0,o=n.length;o>a;a++)!function(e){i.push({value:n[e].email})}(a);e.lists=i,s()}}),e.deleteList=function(n){i.alert({title:"提示",body:"您确定要删除这条黑名单吗？",btns:[{"class":"btn-sure",classmore:"btn-lg",text:"确定",cb:function(){for(var a=0,o=e.lists.length;o>a;a++)if(e.lists[a].value===n){t.blackList.rmBalck({email:n}).then(function(t){e.lists.splice(a,1),s(),i.msg({type:"success",msg:"删除成功"})},function(e){});break}}},{"class":"btn-cancle",text:"取消"}]})},e.addAddress=function(){var t=!1,s=e.emailText.trim();if(!s)return i.msg({type:"error",msg:"输入内容不能为空"}),!1;if(localStorage.getItem("userid")==s)return i.msg({type:"error",msg:"不能添加自己的账号为黑名单"}),e.emailText="",!1;if(n.mailVerify(s)||n.regionVerify(s)){for(var o=!1,r=0;r<e.lists.length;r++)e.lists[r].value===s&&(o=!0);if(o)i.msg({type:"error",msg:"黑名单中已经存该地址"});else{for(var l=0,c=e.whitelists.length;c>l;l++)if(e.whitelists[l].email===s){t=!0;break}t?i.alert({title:"提示",body:"该邮箱地址或域在白名单中，确定要加入黑名单吗？",btns:[{"class":"btn-sure",classmore:"btn-lg",text:"确定",cb:function(){a(s,l)}},{"class":"btn-cancle",text:"取消"}]}):a(s)}}else i.msg({type:"error",msg:"请输入正确的格式！"})}}]),e.controller("setImgSignatureCtrl",["$scope","httpService","setPublicMethod",function(e,t,n){e.jcrop_api="",e.noPicture=!1,e.options={imageSignature:!0,signature:""},e.submitPicOptions={filename:"",domain:0,flag:0,email:n.getUserId()},e.action="sign/act/UploadPicture_V2?flag=0&domain=0&email="+n.getUserId(),t.sign.getSign().then(function(t){200==t.status&&(e.options.imageSignature=t.data.imageSignature,e.options.signature=t.data.signature,e.imageSignatureUrl=t.data.imageSignatureUrl+"?"+(new Date).getTime(),t.data.imageSignatureUrl||(e.noPicture=!0))}),e.footer={functionName:"signature"},e.pictureName="未选择文件",e.cutImage=!1,e.uploadText="浏览",e.config={toolbars:[["Bold","fontfamily","fontsize","forecolor","link"]],fontsize:[10,11,12,14,16,18,20,24,36,48],initialFrameWidth:"100%",scaleEnabled:!1,autoClearinitialContent:!0,allowDivTransToP:!1,wordCount:!1,autoHeightEnabled:!1,elementPathEnabled:!1,initialStyle:"p{line-height:1.5};.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}body{margin:8px;font-family:sans-serif;font-size:12px;}p{margin:0 0;}"},e.editor={},e.showUse=function(t){e.options.imageSignature=t}}]),e.controller("setfilterCtrl",["$scope","httpService","mAlert","configService","setReceiveRuleService","setFilterMap",function(e,t,n,i,a,s){var o=50,r=/,/g;e.initlist=[],e.filterOptions={},e.selectSite=a.selectSite,e.selectTheme=a.selectTheme,e.selectContent=a.selectContent,e.selectMoveSite=a.selectMoveSite,e.mailFolders=i.mailFolders,e.setReceiveRuleService=a,e.setFilterMap=s,e.enableEdit=[!1,!0,!0],e.selectMap=["selectTheme","selectSite","selectContent"],e.showOption={receiveruleShow:!0,newruleShow:!1},e.newruleButton=function(){e.setReceiveRuleService.initRule(e,"新建规则"),e.enableEdit=[!1,!0,!0],e.footer.returnFilter.receiveruleShow=!1,e.footer.returnFilter.newruleShow=!0,e.footer.newOrAlert=!1,e.footer.preview=!1,e.selectTheme.click=!1,e.selectSite.click=!0,e.selectContent.click=!0},e.footer={functionName:"filterNewRule",returnFilter:e.showOption,falseReturn:!1,newOrAlert:!1,preview:!0},e.initNewRule={title:"新建规则"},e.newRule={isStart:0,body:0,logic:0},e.textChange=function(t){r.test(e[t])&&(e[t]=e[t].replace(r,"")),e[t].length>o&&(e[t]=e[t].substr(0,o))},i.getFolderListData().then(function(){t.filter.get().then(function(t){if(200==t.status){if(e.initlist=t.data,e.mailFolders.other&&e.mailFolders.other.length)for(var i in e.mailFolders.other)~e.selectMoveSite.list.indexOf(e.mailFolders.other[i].name)||(e.selectMoveSite.list.push(e.mailFolders.other[i].name),e.setFilterMap.moveTo[e.mailFolders.other[i].folder_id]=e.mailFolders.other[i].name);if(e.mailFolders.multiMails&&e.mailFolders.multiMails.length)for(var i in e.mailFolders.multiMails)~e.selectMoveSite.list.indexOf(e.mailFolders.multiMails[i].name)||(e.selectMoveSite.list.push(e.mailFolders.multiMails[i].name),e.setFilterMap.moveTo[e.mailFolders.multiMails[i].folder_id]=e.mailFolders.multiMails[i].name);e.filterOptions=a.filterOptions(e.initlist,s)}else n.msg({type:"error",msg:"请求接口失败，请稍后再试"})})})}]),e.controller("setPhoneServer",["$scope",function(e){e.footer={functionName:"",firstButton:"保存",preview:!0}}]),e.controller("setManagefolderCtrl",["$scope","$compile","httpService","setPublicMethod","mAlert","configService",function(e,t,n,i,a,s){function o(){setTimeout(function(){e.$emit("scrollbar",{flag:"managefolder",scrollEvent:"update"})},100)}e.configService=s,e.bytesToSize=i.bytesToSize,e.configService.mailFolders.length||setTimeout(function(){o()},2e3);var r=["未读邮件","收件箱","星标邮件","草稿箱","已发送","已删除","垃圾邮件"];e.addFloder=function(){var t=angular.element("#addText").val().trim();if(i.brower().ie&&i.brower().ie<10&&"输入文件夹名称"==t)return a.msg({type:"error",msg:"输入内容不能为空"}),!1;if(!t)return a.msg({type:"error",msg:"输入内容不能为空"}),!1;if(/[#\'\/"‘“ <>%@]/.test(t))return a.msg({type:"error",msg:" 请不要输入#\\\"<>‘“%'@/空格等特殊字符"}),!1;if(~r.indexOf(t))return a.msg({type:"error",msg:"文件夹名称重复"}),!1;var s=!0;for(var l in e.configService.mailFolders.other)if(e.configService.mailFolders.other[l].name===t&&!e.configService.mailFolders.other[l].hide){s=!1,a.msg({type:"error",msg:"文件夹名称重复"});break}if(s){var c={name:t,total:0,size:0};n.otherFolder.addother({name:t}).then(function(t){if(200==t.status){c.folder_id=t.data.folder_id,e.configService.mailFolders.other.push(c),angular.element("#addText").val("");var n=0;angular.element(".ac-table").each(function(){n+=angular.element(this).height()}),n+=angular.element(".addFolder").height();var i=41,s=angular.element(".set-managefolder").scrollTop()+i;n>angular.element(".set-managefolder").height()-i&&angular.element(".set-managefolder").animate({scrollTop:s},300),o()}else a.msg({type:"error",msg:"操作失败，请稍后重试！"})})}},e.renameName="",e.renameReminder="",e.renameReminderFlag=!1,e.rename=function(i){e.renameName=i.name,e.renameReminder="";var s=t('<div class="renameFolder"><span>文件夹名称</span><input type="text" maxlength="20" placeholder="输入文件夹名称" ng-model="renameName" class="inputWidth"/><i class="error-reminder" ng-show="renameReminder.length">{{renameReminder}}</i></div>')(e);a.alert({title:"修改文件夹",body:s,btns:[{"class":"btn-sure",classmore:"btn-lg",text:"确定",closeDefer:!0,cb:function(){if(e.renameName)if(/[#\'\/"<>% @]/.test(e.renameName))e.renameReminder="请不要输入#\\\"<>/%'@空格等特殊字符",e.$apply();else if(~r.indexOf(e.renameName))e.renameReminder="文件夹名称重复",e.$apply();else{var t={id:i.folder_id,name:e.renameName};n.otherFolder.renameother(t).then(function(t){200==t.status?(i.name=e.renameName,a.close()):400==t.status?e.renameReminder="文件夹名称不能包含特殊符号":(a.msg({type:"error",msg:"操作失败，请稍后重试！"}),a.close())})}else e.renameReminder="文件夹名称不能为空",e.$apply()}},{"class":"btn-cancle",text:"取消"}]})},e.empty=function(t){a.alert({title:"提示",body:"您确定要清空文件夹中的所有邮件吗？",btns:[{"class":"btn-sure",classmore:"btn-lg",text:"确定",cb:function(){"number"==typeof t?n.otherFolder.clearother({id:e.configService.mailFolders.other[t].folder_id}).then(function(n){200==n.status?(a.msg({type:"success",msg:"清空文件夹成功"}),e.configService.mailFolders.other[t].total=0,e.configService.mailFolders.other[t].size=0):a.msg({type:"error",msg:"操作失败，请稍后重试！"})}):n.otherFolder.clearother({id:e.configService.mailFolders[t].folder_id}).then(function(n){200==n.status?(e.configService.mailFolders[t].total=0,e.configService.mailFolders[t].size=0):a.msg({type:"error",msg:"操作失败，请稍后重试！"})})}},{"class":"btn-cancle",text:"取消"}]})},e.deleteFolders=function(t,i){var s=e.configService.mailFolders.other[t].hasFilter?"删除操作会导致此文件夹对应的来信规则一并删除，您仍要删除此文件夹吗？":"您确定要删除此文件夹吗？";a.alert({title:"提示",body:s,btns:[{"class":"btn-sure",classmore:"btn-lg",text:"确定",cb:function(){n.otherFolder.deleteother({id:e.configService.mailFolders.other[t].folder_id}).then(function(e){200==e.status?(i.hide=!0,o()):a.msg({type:"error",msg:"操作失败，请稍后重试！"})})}},{"class":"btn-cancle",text:"取消"}]})}}]),e.controller("setPopCtrl",["$scope","$state","$compile","httpService","setPublicMethod","mAlert","configService","$interval",function(e,t,n,i,a,s,o,r){function l(){i.setAutoreply.bindQuery().then(function(t){200===Number(t.status)&&(e.bindOption.count=t.data.count,e.bindOption.showPhone=t.data.mobile,e.bindOption.countFlag=!0,e.bindOption.count||(e.bindOption.grayFlag=!0))})}function c(t){if(200===Number(t.status)){var n=60;e.bindOption.grayFlag=!0,e.bindOption.contentCaptcha="剩余"+n+"s";var i=r(function(){e.bindOption.contentCaptcha="剩余"+n+"s",n--,n||(e.bindOption.contentCaptcha="获取验证码",r.cancel(i),e.bindOption.grayFlag=!1)},1e3);l()}403===Number(t.status)&&(e.bindOption.message="手机号码已被绑定，若有问题请联系客服热线： 010-58103760",e.bindOption.showMsgFlag=!0),406!==Number(t.status)&&412!==Number(t.status)||(e.bindOption.message="请求次数过多",e.bindOption.showMsgFlag=!0)}e.footer={functionName:"setPop",firstButton:"保存"},e.options={pop3:0,imap:0},i.protocol.getProtocol().then(function(t){200===Number(t.status)&&(e.options.pop3=t.data.pop3,e.options.imap=t.data.imap)}),e.checkBox=function(t,n){e.options[t]=(Number(e.options[t])+1)%2},e.bindOption={showPhone:"",msgCaptcha:"",bindPhone:"",count:"",countFlag:!1,showMsgFlag:!1,message:"请输入正确的手机号",grayFlag:!1,submitMsg:"",errorPhoneFlag:!1,contentCaptcha:"获取验证码"},l(),e.showErrorMsg=function(){e.bindOption.errorPhoneFlag=!0},e.getcaptcha=function(t){if(e.bindOption.showMsgFlag=!1,!e.bindOption.grayFlag)if(t)i.setAutoreply.getVerCode().then(function(e){c(e)});else{if(!a.checkPhone(e.bindOption.bindPhone))return e.bindOption.message="请输入正确的手机号",e.bindOption.showMsgFlag=!0,!1;i.setAutoreply.getVerCode({bindPhone:e.bindOption.bindPhone}).then(function(e){c(e)})}},e.$watch("bindOption.msgCaptcha",function(t,n,i){e.bindOption.msgCaptcha=a.checkNum(t)}),e.$watch("bindOption.bindPhone",function(t,n,i){e.bindOption.bindPhone=a.checkNum(t)});var d=!0;e.saveFun=function(){e.bindOption.showMsgFlag=!1,e.bindOption.errorPhoneFlag=!1,e.bindOption.submitMsg=!1;var a=n('<div class="input-phone">            <div>为了保护账号安全，此功能需进行手机验证，或者使用<a class="href" href="//mail-promo.sohusce.com/itunes/?guid=64f647b94" target="_blank">搜狐邮箱客户端</a></div>            <div>                <span>验证码：</span>                <input class="input-captcha" type="text" maxlength="6" placeholder="请输入验证码" ng-model="bindOption.msgCaptcha">                <span ng-click="getcaptcha(true)" class="get-button" ng-class="{true: \'gray\', false: \'\'}[!!bindOption.grayFlag]">{{bindOption.contentCaptcha}}</span>                <span ng-show="bindOption.countFlag" class="residue">剩余{{bindOption.count}}次</span>            </div>            <div ng-show="!!bindOption.submitMsg" class="message">{{bindOption.submitMsg}}</div>            <div>                <span>接收验证码的手机号：</span>                <span>{{bindOption.showPhone | phone}}</span>                <a ng-click="showErrorMsg()" class="link">手机号码有误</a>            </div>             <div ng-show="bindOption.errorPhoneFlag" class="message padding-left">请联系客服热线： 010-58103760</div>        </div>')(e),o=n('<div class="input-phone">            <div>为了保护账号安全，此功能需进行手机验证，或者使用<a class="href" href="//mail-promo.sohusce.com/itunes/?guid=64f647b94" target="_blank">搜狐邮箱客户端</a></div>            <div>                <span>手机号：</span>                <input class="input-width" type="text" maxlength="11" placeholder="请输入手机号" ng-model="bindOption.bindPhone">                <span ng-click="getcaptcha()" class="get-button" ng-class="{true: \'gray\', false: \'\'}[!!bindOption.grayFlag]" >{{bindOption.contentCaptcha}}</span>                <span ng-show="bindOption.countFlag" class="residue">剩余{{bindOption.count}}次</span>            </div>            <div ng-show="bindOption.showMsgFlag" class="message">{{bindOption.message}}</div>            <div>               <span>验证码：</span>                <input class="input-captcha" type="text" maxlength="6" placeholder="请输入验证码" ng-model="bindOption.msgCaptcha">            </div>            <div ng-show="!!bindOption.submitMsg" class="message">{{bindOption.submitMsg}}</div>        </div>')(e);s.alert({title:"手机验证",body:e.bindOption.showPhone?a:o,btns:[{"class":"btn-sure",text:"确定",closeDefer:!0,cb:function(){return e.options.msgCap=e.bindOption.msgCaptcha,e.bindOption.showPhone||(e.options.bindPhone=e.bindOption.bindPhone,e.options.bindPhone)?!e.options.msgCap||e.options.msgCap.length<6?(e.bindOption.submitMsg="请输入正确的验证码",d=!0,e.$apply(),!1):(e.options.smtp=e.options.pop3|e.options.imap,void i.protocol.postProtocol(e.options).then(function(n){if(n&&200==n.status)s.msg({type:"success",msg:"保存成功"}),s.close(),t.go("setting");else{var i="操作失败，请稍后重试！";409==n.status&&(i="验证码不正确"),403==n.status&&(i="该手机号已经绑定至其它帐号"),400==n.status&&(i="验证码错误"),406==n.status&&(i="提交次数过多"),1300==n.status&&(i="当前邮箱已绑定了其他手机号"),1301==n.status&&(i="当前邮箱未绑定手机号"),e.bindOption.submitMsg=i}d=!0},function(){s.msg({type:"error",msg:"操作失败，请稍后重试！"})})):(e.bindOption.message="手机号不能为空",e.bindOption.showMsgFlag=!0,e.$apply(),!1)}},{"class":"btn-cancle",text:"取消"}]})}}]),e.filter("phone",function(){return function(e){var t=/1(\d{2})\d{4}(\d{4})/g;return e.replace(t,"1$1****$2")}})}();