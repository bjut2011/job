$(function(){$(".dev-list .j_del").on("click",function(t){t.preventDefault();var i=$(this);IOT.Dialog.confirm(IOT.tr("确定删除此设备？"),function(){IOT.post("/device/del",{pid:i.attr("data-pid"),device_id:i.attr("data-id")},function(t){t!==!1&&(0==t.code?(IOT.tips(IOT.tr("删除成功")),setTimeout(function(){location.reload()},2500)):IOT.showPostError(t.msg))},"json")})})});