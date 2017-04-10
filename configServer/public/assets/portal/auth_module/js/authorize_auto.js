/** PORTAL SITE AUTHORIZE **/
var SMSTIME = null;
var SMSSECO = 120;
var AUTHTYPE = 'mobile';

$(document).ready(function(){




    //显示验证方式
});



/**
 * 获取URL地址REQUEST参数值
 * @param key
 * @returns
 */
function getRequestValue(key){
	var url = window.location.search.substring(1);
	var par = url.split('&');
	for(i=0;i<par.length;i++){
		var code = par[i].split('=');
		if(key==code[0]) return code[1]; 
	}
	return false;
}

/**
 * 
 */
function getReqeust2Obj(){
	var url = window.location.search.substring(1);
	var par = url.split('&');
	for(i=0;i<par.length;i++){
		var code = par[i].split('=');
		//if(key==code[0]) 
	}
}

function getAuthModule(type){
	type = type.toLowerCase();
	switch(type){
		case 'mobile':
			return AUTH_TYPE_MODULE.mobile;
			break;
		case 'email':
			return AUTH_TYPE_MODULE.email;
			break;
		case 'userpwd':
			return AUTH_TYPE_MODULE.userpwd;
			break;
		case 'option':
			return AUTH_TYPE_MODULE.option;
			break;
		case 'extend':
			return AUTH_TYPE_MODULE.extend;
			break;
		default:
			return AUTH_TYPE_MODULE.mobile;
	}
}

$(function(){
        //onValidatorOption();
        setInterval('onValidatorOption()',600);
});
function GetRandomNum(Min,Max)
{   
  var Range = Max - Min;   
  var Rand = Math.random();   
  return(Min + Math.round(Rand * Range));   
}   

	
function onValidatorOption(){
	var authurl= $('div#siteLoginModuleBox').attr('platSvrAddr');
        var rand= GetRandomNum(1,100000);
	$.ajax({
		url:'../auth/login',
		type:'POST',
		dataType: 'json',                
		data:{mac:getRequestValue('client_mac').replace(/:/g,"").toUpperCase(),rand:rand,auth_type:'option',dev_id:getRequestValue('dev_id'),browser_type: $.client.browser, terminal_type: $.client.os},
		success:function(data){
			if(data.result=='OK'){
				//http://192.168.3.186:8000/site/login/?dev_id=f5cb9be1-ff5f-4966-8d14-85b5d6c34336&gw_address=192.168.10.1&gw_port=2060&gw_id=0017A5700636&url=http%3A//www.baidu.com/index.php%3Ftn%3Dmonline_5_dg
				if(!getRequestValue('gw_address')||getRequestValue('gw_address')==''){
					location.href = 'http://'+location.hostname+':'+location.port+'/api10/portal/?'+location.search.substr(1);
				}else{
					location.href = 'http://'+getRequestValue('gw_address')+':'+getRequestValue('gw_port')+'/smartwifi/auth?token='+data.token+'&url='+encodeURIComponent(getRequestValue('url'));
				}
			}else{
				alert('用户验证失败，请重新验证');
			}
		}
	});
}

