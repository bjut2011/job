!function(){"use strict";var n=angular.module("skinModule",[]);n.controller("skinCtrl",["$scope","$rootScope","configService","httpService","skinService","mAlert",function(n,e,r,s,i,t){i.initSkin(function(){n.skinArr=i.skinArr}),n.checkd=function(e,r,o){s.skin.postSkin({skinId:o}).then(function(s){if(200===Number(s.status))for(var o=0,c=n.skinArr.length;c>o;o++)for(var k=n.skinArr[o].list,a=0,l=k.length;l>a;a++)k[a].show&&(k[a].show=!1),e===n.skinArr[o].name&&r===a&&(k[a].show=!0,i.addSkin(k[a]));else t.msg({type:"error",msg:"换肤失败"})})}}]),n.service("skinService",["httpService","configService","mAlert",function(n,e,r){function s(n){if(n)for(var e=n.id,r=0,s=t.skinArr.length;s>r;r++)for(var i=t.skinArr[r].list,o=0,c=i.length;c>o;o++)if(i[o].id===e){i[o].show=!0,t.addSkin(i[o]);break}}function i(){e.userSkin?s(e.userSkin):e.getSkinUser(function(){s(e.userSkin)})}var t=this;t.skinArr=[],t.addSkin=function(n){$("<link>").attr({rel:"stylesheet",type:"text/css",href:n.cssUrl}).appendTo("head"),$("#SkinClass").removeClass().addClass(n.cssName),localStorage.setItem("cssUrl",n.cssUrl),localStorage.setItem("cssName",n.cssName),e.getSkinUser()},t.initSkin=function(e){t.skinArr.length?(i(),e&&e()):n.skin.getSkin().then(function(n){200===Number(n.status)?(t.skinArr=n.data,i()):r.msg({type:"error",msg:"获取皮肤列表失败"}),e&&e()})}}])}();