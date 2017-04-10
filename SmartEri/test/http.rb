require 'net/http'  
require 'json'
require 'mongo'

def func1
    client = Mongo::Client.new('mongodb://127.0.0.1:27017/smart_eri')
    db = client.database
    while 1
      begin
	http = Net::HTTP.new('219.141.189.130', 8181)  
	http.use_ssl = false  
	puts Time.now.to_i
	#path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uMainBatteryVoltageResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000-3600000).to_s+"&t2=" +(Time.now.to_i*1000).to_s )
	path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uMainBatteryVoltageResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
	puts path  
  
	headers = {   ##定义http请求头信息  
  	'Authorization' => 'PREAUTHENTICATED',  
  	'X-Requester-Id' => 'CTBRI$trustedSmartTrashCanApp',  
  	'X-Requester-Type' => 'domainApplication' , 
  	'Accept' => 'application/vnd.ericsson.m2m.output+json;version=1.0'  
	}  
	resp, data = http.get(path, headers)  
  
  
	puts 'Code = ' + resp.code    ##请求状态码  
	puts 'Message = ' + resp.message 
	#puts 'Body = ' + resp.body
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '主蓄电池电压' } ,{ '$set' => { value:value["value"],sensorType: 1 ,tag:"正常",icon:10,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '主蓄电池电压' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '主蓄电池电压' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end


        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uTodayDoorOpenTimesResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '今天开门次数累计' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '今天开门次数累计' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '今天开门次数累计' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uToday70PercentCompressTimesResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '今天70%启动压缩次数' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '今天70%启动压缩次数' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '今天70%启动压缩次数' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uSubBatteryVoltageResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '副蓄电池电压' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '副蓄电池电压' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '副蓄电池电压' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uToday90PercentCompressTimesResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '今天90%启动压缩次数' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '今天90%启动压缩次数' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '今天90%启动压缩次数' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uTemperatureResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '温度' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '温度' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '温度' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$cLongitudeIntResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        lat=0.0
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         lat=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$cLongitudeDecimalResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         lat+=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         collection.update_one( { _id: dev[:_id] } ,{ '$set' => { lat:lat ,update_time:Time.now.to_i}})
         dev=collection.find( { _id: dev[:_id] } ).first
         puts dev
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$cLatitudeIntResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        lon=0.0
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         lon=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$cLatitudeDecimalResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '10649000016' } ).first
         puts dev
         secol = db[:sensors]
         lon+=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         collection.update_one( { _id: dev[:_id] } ,{ '$set' => { lon:lon ,update_time:Time.now.to_i}})
         dev=collection.find( { _id: dev[:_id] } ).first
         puts dev
        end
      rescue  Net::ReadTimeout
         puts "ReadTimeout"
      end
      sleep(60)
    end
end

def func2
    client = Mongo::Client.new('mongodb://127.0.0.1:27017/smart_eri')
    db = client.database
    while 1
      begin
	http = Net::HTTP.new('219.141.189.130', 8181)  
	http.use_ssl = false  
	puts Time.now.to_i
	#path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan10649000016&resourceSpec=CTBRI$uMainBatteryVoltageResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000-3600000).to_s+"&t2=" +(Time.now.to_i*1000).to_s )
	path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$uMainBatteryVoltageResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
	puts path  
  
	headers = {   ##定义http请求头信息  
  	'Authorization' => 'PREAUTHENTICATED',  
  	'X-Requester-Id' => 'CTBRI$trustedSmartTrashCanApp',  
  	'X-Requester-Type' => 'domainApplication' , 
  	'Accept' => 'application/vnd.ericsson.m2m.output+json;version=1.0'  
	}  
	resp, data = http.get(path, headers)  
  
  
	puts 'Code = ' + resp.code    ##请求状态码  
	puts 'Message = ' + resp.message 
	#puts 'Body = ' + resp.body
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         if cns.nil?
           sleep(30)
           next
         end
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '主蓄电池电压' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '主蓄电池电压' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '主蓄电池电压' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end


        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$uTodayDoorOpenTimesResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '今天开门次数累计' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '今天开门次数累计' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '今天开门次数累计' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$uToday70PercentCompressTimesResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '今天70%启动压缩次数' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '今天70%启动压缩次数' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '今天70%启动压缩次数' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$uSubBatteryVoltageResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '副蓄电池电压' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '副蓄电池电压' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '副蓄电池电压' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$uToday90PercentCompressTimesResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '今天90%启动压缩次数' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '今天90%启动压缩次数' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '今天90%启动压缩次数' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$uTemperatureResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         sen=secol.update_one( { device_id: dev[:_id],name: '温度' } ,{ '$set' => { value:value["value"] ,time:time,updatetime:Time.now.to_i}})
         sen=secol.find( { device_id: dev[:_id],name: '温度' } ).first
         if sen.nil?
            secol.insert_one({ device_id: dev[:_id],name: '温度' , value:value["value"] ,tag:"正常",time:time,updatetime:Time.now.to_i,sensorType: 1,icon:10})
         end
         puts sen
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$cLongitudeIntResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        lat=0.0
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         lat=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$cLongitudeDecimalResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         lat+=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         collection.update_one( { _id: dev[:_id] } ,{ '$set' => { lat:lat ,update_time:Time.now.to_i}})
         dev=collection.find( { _id: dev[:_id] } ).first
         puts dev
        end

        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$cLatitudeIntResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        lon=0.0
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         lon=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
        end
        path =('/m2m/trusted/data?dgw=CTBRI%24smartTrashCan64913128315&resourceSpec=CTBRI$cLatitudeDecimalResSpec&orderPayloadsBy=timestamp,DESC&t1='+ (Time.now.to_i*1000+8*60*60*1000-300000).to_s+"&t2=" +(Time.now.to_i*1000+8*60*60*1000).to_s )
        resp, data = http.get(path, headers)
        if resp.code=="200"
         sto = JSON.parse(resp.body)
         cns = sto["contentNodes"]
         value=cns[0]
	 puts value["value"]
	 puts value["time"]
         collection = db[:devices]
         dev=collection.find( { device_sn: '64913128315' } ).first
         puts dev
         secol = db[:sensors]
         lon+=value["value"]
         time= DateTime.parse(Time.now.to_s).strftime('%Y-%m-%d %H:%M:%S').to_s
         collection.update_one( { _id: dev[:_id] } ,{ '$set' => { lon:lon ,update_time:Time.now.to_i}})
         dev=collection.find( { _id: dev[:_id] } ).first
         puts dev
        end
      rescue  Net::ReadTimeout
         puts "ReadTimeout"
      end
      sleep(60)
    end
end

t1=Thread.new{func1()}
t2=Thread.new{func2()}
t2.join
