class DevicesController < ApplicationController
  before_action :set_device, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token
  # GET /devices
  # GET /devices.json
  def ping
    str='故障报警：垃圾桶满溢，位置是未来科技城，请及时处理！'
    if params['name']
       @device= Device.where(device_sn:params['name'].delete(":")).first
       if @device.nil?
        create_time=Time.now
        city="北京市"
        device_name=params['name'].delete(":")
        device_mark=""
        device_details=""
        sn=params['name'].delete(":")
        @device = Device.new(create_time:create_time,device_name:device_name,device_mark:device_mark,device_details:device_details,device_sn:sn,city:city,province:city,type:"1-3")
        @device.save
       end
       if @device
          @sensorO=Sensor.where(:device_id => @device.id,:name => "满溢度").first
          if @sensorO.nil?
            create_time=Time.now
            @sensorO = Sensor.new(device_id:@device.id,time:create_time,value:params[:value],balarm:0,icon:10,interval:0,name:"满溢度",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
            @sensorO.save
          end
          @sensorO.update_attributes(value:params[:value])
          create_time=Time.now
          @slog = Sensorlog201704.new(sensor_id:@sensorO.id,time:create_time,value:params[:value],name:"满溢度",tag:"距离",update_time:create_time.to_i)
          @slog.save
          @alarms=Alarmv.where(deviceId:@device.id.to_s,alarmType:"full")
          if @alarms
             for item in @alarms do
                 @con=Contact.find(item.contactId)
                 logger.info @con
                 mobile=@con.mobile
                 pas={}
                 pas["method"] = 'Submit'  
                 pas["account"] = 'cf_zst'  
                 pas["password"] = 'cdc123456'  
                 pas["mobile"] = mobile  
                 pas["content"] = str  
                 uri = URI.parse("http://106.ihuyi.cn/webservice/sms.php?method=Submit")
                 if params[:value].to_i < 27
                  res = Net::HTTP.post_form(uri, pas) 
                 end
                 logger.info "test1"
             end
          end
       end
      
    end
    pas = {}  
    pas["method"] = 'Submit'  
    pas["account"] = 'cf_zst'  
    pas["password"] = 'cdc123456'  
    pas["mobile"] = '13810139056'  
    pas["content"] = str  
    uri = URI.parse("http://106.ihuyi.cn/webservice/sms.php?method=Submit")
    #res = Net::HTTP.post_form(uri, pas) 
    #logger.info res
    respond_to do |format|
      format.json { render :json => {:code =>1,:msg =>"success"} }
    end
  end
  def index
    @devices = Device.all
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    #for de in @devices do
    #    de.update_attributes(user_id:current_admin.id)
      
    #end 
    if current_admin.nil?
        redirect_to root_url, :notice => "已经退出登录"
    end
    name=""
    if params[:name]
       name=params[:name]
    end
    regname = Regexp.new(name)  
    sn=""
    if params[:sn]
       sn=params[:sn]
    end
    regsn = Regexp.new(sn)  
    if params["pid"] and current_admin and current_admin.type ==1
       pid=params["pid"]
       @devices=User.find(pid).device
       @project_name=User.find(pid).name
       @project_id=User.find(pid).id
       @devices=Device.where(:user_id =>pid ,:device_name => regname,:device_sn => regsn)
    end
    if params["pid"] and current_admin and current_admin.type ==2
       @project_name=current_admin.name
       @project_id=current_admin.id.to_s
       @u2ds=Userdevice.where(user_id:current_admin.id.to_s)
       deviceids=[]
       @u2ds.each do |ud|
          deviceids.push(ud.device_id)
       end
       @devices=Device.where(:id.in => deviceids,:device_name => regname,:device_sn => regsn)
    end
    @status=-1
    if params[:status]
     @status=params[:status]
    end
    logger.info "class_1234"
    logger.info @devices.class
  end
  def main
  end
 
  def chart
  end

  def flowinfo
  end

  def search
    page=1
    if params[:page]
      page=params[:page]
    end
    name=""
    if params[:name]
       name=params[:name]
    end
    regname = Regexp.new(name)  
    city=""
    if params[:city]
       city=params[:city]
    end
    regcity = Regexp.new(city)  
    @count=Devices.all.count
    @totolpage=@count/30+1;
    @devices=Devices.where( :device_name => { '$exists'=> true } ).paginate(page:page,per_page:30)
    if name!=""
      @devices=Devices.where( :device_name => regname ).paginate(page:page,per_page:30)
    end
    if city!=""
      @devices=Devices.where( :province => regcity ).paginate(page:page,per_page:30)
    end
  end

  def lists 
    page=1
    if params[:page]
      page=params[:page]
    end
    name=""
    if params[:name]
       name=params[:name]
    end
    regname = Regexp.new(name)  
    type=""
    if params[:type]
       type=params[:type]
    end
    regtype = Regexp.new(type)  
    @count=Devices.all.count
    @totolpage=@count/30+1;
    @devices=Devices.where( :device_name => { '$exists'=> true } ).paginate(page:page,per_page:30)
    if name!=""
      @devices=Devices.where( :device_name => regname ).paginate(page:page,per_page:30)
    end
    if type！=""
      @devices=Devices.where( :type => regtype ).paginate(page:page,per_page:30)
    end
    for item in Devices.all do
       location=item.lon.to_s                                                      
       location+=","                                                                  
       location+=item.lat.to_s                                                     
       params["location"] = location                                                  
       params["key"] = "0b26981dfe81b58acb8b3b96cfb65fe0"                             
       #item.update_attributes(type:"1-1")
       #uri = URI.parse("http://restapi.amap.com/v3/geocode/regeo?key=0b26981dfe81b58acb8b3b96cfb65fe0&location="+location)
       #res = Net::HTTP.post_form(uri, params)                                         
       #logger.info res.body
       #jso=JSON.parse(res.body)
       #if jso["status"] =="1"                                    
        #city=jso["regeocode"]["addressComponent"]["city"] 
        #logger.info city
        #if city.size ==0
          #city=jso["regeocode"]["addressComponent"]["province"] 
        #end
        #item.update_attributes(city:city,province:jso["regeocode"]["addressComponent"]["province"])
       #end
    end
    
  end

  def panel
    page=1
    if params[:page]
      page=params[:page]
    end
    @count=Devices.all.count
    @totolpage=@count/30+1;
    @devices=Devices.all
    
  end
  def province 
  end

  def point
    @ad_p=params[:p1]
    @full_p=params[:p2]
  end

  def trash
     tt = Time.new
     tm=Time.now.to_i
     day=Time.now
     dayt = Time.new(day.year, day.month, day.day)
     tm=dayt.to_i
     @device=Device.find(params[:id])
     @sensorO=Sensor.where(:device_id => @device.id,:name => "今天开门次数累计").first
     if @sensorO.nil?
       @sensorO=Sensor.where(:device_id => @device.id,:name => "今天开门次数").first
     end
     if @sensorO.nil?
       create_time=Time.now
       value=23+rand(1)
       @sensorO = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"今天开门次数",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorO.save
     end
     #if tt.year==2017 && tt.month==2
      # @sensorlog=Sensorlog201702.where(:sensor_id => @sensorO.id,:update_time.gt => tm).sort(:time => :desc)
     #elsif  tt.year==2017 && tt.month==1
      # @sensorlog=Sensorlog201701.where(:sensor_id => @sensorO.id,:update_time.gt => tm).sort(:time => :desc)
     #elsif  tt.year==2017 && tt.month==3
      # @sensorlog=Sensorlog201703.where(:sensor_id => @sensorO.id,:update_time.gt => tm)
     #end
     #if @sensorlog.nil? or @sensorlog.empty? 
      # @device=Device.find("584a4483421aa93765000003")
      # @device=Device.find("57e494ad421aa98d0c000001")
     #end
     #@device=Device.find("57e494ad421aa98d0c000001")
     @sensorM=Sensor.where(:device_id => @device.id,:name => "主蓄电池电压").first
     if @sensorM.nil?
       @sensorM=Sensor.where(:device_id => @device.id,:name => "主电池电压").first
     end
     if @sensorM.nil?
       create_time=Time.now
       value=23+rand(1)
       @sensorM = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"主电池电压",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorM.save
     end
     logger.info @sensorM.value
     @sensorS=Sensor.where(:device_id => @device.id,:name => "副蓄电池电压").first
     if @sensorS.nil?
        @sensorS=Sensor.where(:device_id => @device.id,:name => "副电池电压").first
     end
     if @sensorS.nil?
       create_time=Time.now
       value=23+rand(1)
       @sensorS = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"副电池电压",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorS.save
     end
     @sensorT=Sensor.where(:device_id => @device.id,:name => "温度").first
     if @sensorT.nil?
       create_time=Time.now
       value=0
       @sensorT = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"温度",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorT.save
     end
     @sensorO=Sensor.where(:device_id => @device.id,:name => "今天开门次数累计").first
     if @sensorO.nil?
       @sensorO=Sensor.where(:device_id => @device.id,:name => "今天开门次数").first
     end
     if @sensorO.nil?
       create_time=Time.now
       value=23+rand(1)
       @sensorO = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"今天开门次数",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorO.save
     end
     @sensorC=Sensor.where(:device_id => @device.id,:name => "今天90%启动压缩次数").first
     if @sensorC.nil?
        @sensorC=Sensor.where(:device_id => @device.id,:name => "今天90%启动压缩装置次数").first
     end
     if @sensorC.nil?
       create_time=Time.now
       value=0
       @sensorC = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"今天90%启动压缩次数",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorC.save
     end
     @sensorC7=Sensor.where(:device_id => @device.id,:name => "今天70%启动压缩次数").first
     if @sensorC7.nil?
       @sensorC7=Sensor.where(:device_id => @device.id,:name => "今天70%启动压缩装置次数").first
     end
     if @sensorC7.nil?
       create_time=Time.now
       value=0
       @sensorC7 = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"今天70%启动压缩次数",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorC7.save
     end
     @sensorRR=Sensor.where(:device_id => @device.id,:name => "压缩比").first
     @sensorTC=Sensor.where(:device_id => @device.id,:name => "累计压缩次数").first
     @sensorTO=Sensor.where(:device_id => @device.id,:name => "累计开门次数").first
     @sensorRR=Sensor.where(:device_id => @device.id,:name => "压缩比").first
     if @sensorRR.nil?
       create_time=Time.now
       value=60+rand(10)
       @sensorRR = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"压缩比",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorRR.save
     end
     @sensorTC=Sensor.where(:device_id => @device.id,:name => "累计压缩次数").first
     if @sensorTC.nil?
       create_time=Time.now
       value=2210+rand(500)
       @sensorTC = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"累计压缩次数",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorTC.save
     end
     @sensorTO=Sensor.where(:device_id => @device.id,:name => "累计开门次数").first
     if @sensorTO.nil?
       create_time=Time.now
       value=32210+rand(5500)
       @sensorTO = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"累计开门次数",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorTO.save
     end
     @sensorTD=Sensor.where(:device_id => @device.id,:name => "累计流量").first
     if @sensorTD.nil?
       create_time=Time.now
       value=121+rand(50)
       @sensorTD = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"累计流量",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorTD.save
     end
     @sensorTW=Sensor.where(:device_id => @device.id,:name => "累计故障次数").first
     if @sensorTW.nil?
       create_time=Time.now
       value=rand(10)
       @sensorTW = Sensor.new(device_id:@device.id,time:create_time,value:value.to_s,balarm:0,icon:10,interval:0,name:"累计故障次数",order:7,sensorSign:0,sensorType:1,sensorUnit:"V",tag:"正常",updatetime:create_time.to_i,alarmtime:create_time.to_i)
       @sensorTW.save
     end
     @device=Device.find(params[:id])
     @sensorFU=Sensor.where(:device_id => @device.id,:name => "满溢度").first
  end




  def city
    @devices=Device.where(:city => params[:type])
    if params[:tpye]=="1"
      @ad_p=67
      @full_p=6
    elsif params[:type]=="2"
      @ad_p=80
      @full_p=7
    else
      @ad_p=89
      @full_p=12
    end
  end

  def layout
  end
  
  def statistics
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    @project_id=current_admin.id
    @devices = Device.all
  end

  def map
  end

  def history

   @sensorId=params[:sensorId]
   @deviceId=params[:deviceId]
   @seobject=Sensor.find(@sensorId);
   @deobject=Device.find(@deviceId);
   @queryDate=params[:queryDate]
   logger.info @deobject
   logger.info  @deviceId
  end
  
  def goHistoryLine
   @queryDate=params[:queryDate]
   @sensorid=params[:sensorId]
  end

  def alarmsms
    str='您的验证码是：123。请不要把验证码泄露给其他人。'
    params = {}  
    params["method"] = 'Submit'  
    params["account"] = 'cf_zst'  
    params["password"] = 'cdc123456'  
    params["mobile"] = '13810139056'  
    params["content"] = str  
    uri = URI.parse("http://106.ihuyi.cn/webservice/sms.php?method=Submit")
    res = Net::HTTP.post_form(uri, params) 
    respond_to do |format|
      format.json { render :json => {:code =>1,:msg =>"ok",:redirect_uri =>"/"} }
    end
  end
  
  def queryLineData
    @sensor_id=params[:sensorId]
  end

  def getDevices
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    @devices = Device.all
    if current_admin and current_admin.type==1
       logger.info current_admin.id
       @devices=Device.where(user_id:current_admin.id)
       @project_name=User.find(current_admin.id).name
       @project_id=User.find(current_admin.id).id
    end
    if current_admin and current_admin.type ==2
       @project_name=current_admin.name
       @project_id=current_admin.id.to_s
       @u2ds=Userdevice.where(user_id:current_admin.id.to_s)
       deviceids=[]
       @u2ds.each do |ud|
          deviceids.push(ud.device_id)
       end
       @devices=Device.where(:id.in => deviceids)
    end
    respond_to do |format|
      format.json {render :json => {:code =>0,:data => @devices}}
    end
  end

  def explore
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    if current_admin.nil?
        redirect_to root_url, :notice => "已经退出登录"
    end
    @devices = Device.all
    if params["pid"] and current_admin and current_admin.type==1
       pid=params["pid"]
       logger.info pid
       @devices=User.find(pid).device
       @project_name=User.find(pid).name
       @project_id=User.find(pid).id
       @user_id=User.find(pid).id
    end
    if current_admin and current_admin.type ==2
       @project_name=current_admin.name
       @user_id=current_admin.id.to_s
       @project_id=current_admin.id.to_s
       @u2ds=Userdevice.where(user_id:current_admin.id.to_s)
       @devices=[]
       @u2ds.each do |ud|
          de=Device.find(ud.device_id)
          if de
            @devices.push(de)
          end
       end
    end
  end
  # GET /devices/1
  # GET /devices/1.json
  def show
      current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
      if current_admin.nil?
        redirect_to root_url, :notice => "已经退出登录"
      end
      @dev_id=params["id"]
      @dev=Device.find(@dev_id)
      if current_admin.type!=0
        @sensor=Sensor.where(:device_id => @dev.id,:display => 1).sort(:order)
        
      else
        @sensor=@dev.sensor
      end
      @project=User.find(@dev.user_id)
  end

  def monitor
   @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
   if @current_admin.nil?
        redirect_to root_url, :notice => "已经退出登录"
   end
   if params["pid"] and @current_admin and @current_admin.type==1
       pid=params["pid"]
       logger.info pid
       @devices=User.find(pid).device.order('update_time desc')
       @project_name=User.find(pid).name
       @project_id=User.find(pid).id
   else
    
     @devices = Device.all
   end
   if params["pid"] and @current_admin and @current_admin.type ==2
       @project_name=@current_admin.name
       @project_id=@current_admin.id.to_s
       @u2ds=Userdevice.where(user_id:@current_admin.id.to_s)
       @devices=[]
       de1=[]
       @u2ds.each do |ud|
          de=Device.find(ud.device_id)
          if de
            if de.update_time.nil?
             de1.push(de)
            else
             @devices.push(de)
            end
          end
       end
       @devices.sort! { |a,b| b.update_time <=> a.update_time }
       de1.each do |item|
         @devices.push(item)
       end
   end
   @status=-1
   if params[:status]
     @status=params[:status]
   end
   @device_id=""
   if params[:device_id]
      @device_id=params[:device_id]
   end
  end
  
  def modify
  end
  # GET /devices/new
  def new
    @device = Device.new
    @project_id=params[:pid]
    @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
  end

  def dashboard
    
    @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    if @current_admin.nil?
        redirect_to root_url, :notice => "已经退出登录"
    end
    @user_id=@current_admin.id
    @devices = Device.all
    @count=@devices.size
    @online=Device.where(:update_time.gt => (Time.now.to_i-300)).count
    @offline=@count-@online
  end
  # GET /devices/1/edit
  def edit
  end

  # POST /devices
  # POST /devices.json
  def create
    logger.info params
    create_time=Time.now
    city=params["city"]
    device_name=params["deviceName"]
    device_mark=""
    device_details=""
    sn=params["sn"]
    @device = Device.new(create_time:create_time,device_name:device_name,device_mark:device_mark,device_details:device_details,device_sn:sn,city:city)
    @device.save
    if params[:deviceSensorList]
      for item in params[:deviceSensorList] do
        logger.info item[1][:sensorName]
        senid=item[1][:sensorId]
        sensorType=item[1][:sensorType].to_i
        sensorSign=0
        if item[1][:sensorSign]
           sensorSign=item[1][:sensorSign].to_i 
        end
        if senid!=''
          sen=Sensor.find(senid)
          sen.update_attributes(name:item[1][:sensorName],sensorUnit:item[1][:sensorUnit],sensorType:sensorType,sensorSign:sensorSign)
        else
          sensorType=item[1][:sensorType].to_i
          sensorSign=0
          if item[1][:sensorSign]
            sensorSign=item[1][:sensorSign].to_i 
          end
          sen=Sensor.new(device_id:@device.id,name:item[1][:sensorName],sensorType:sensorType,sensorSign:sensorSign,sensorUnit:item[1][:sensorUnit])
          sen.save()
        end
        
        
     end
    end
    respond_to do |format|
      #if @device.save
        #format.html { redirect_to @device, notice: 'Device was successfully created.' }
        # format.json {render :json => {:code =>0,:msg =>"创建成功",:redirect_uri =>"/",:data => {:device_id => @device.id,:key =>"",:proj_name => @device.project.name}}}
      #else
        #format.html { render :new }
        format.json {render :json => {:code =>1,:msg =>"创建失败"}}
      #end
    end
  end

  # PATCH/PUT /devices/1
  # PATCH/PUT /devices/1.json
  def update
    @device=Device.find(params[:id])
    deviceName=params[:deviceName]
    sn=params[:sn]
    if deviceName
       @device.update_attributes(device_name:deviceName,device_sn:sn)
    end
    if params[:deviceSensorList]
      for item in params[:deviceSensorList] do
        logger.info item[1][:sensorName]
        senid=item[1][:sensorId]
        sensorType=item[1][:sensorType].to_i
        sensorSign=0
        if item[1][:sensorSign]
           sensorSign=item[1][:sensorSign].to_i 
        end
        if senid!=''
          sen=Sensor.find(senid)
          sen.update_attributes(name:item[1][:sensorName],sensorUnit:item[1][:sensorUnit],sensorType:sensorType,sensorSign:sensorSign)
        else
          sensorType=item[1][:sensorType].to_i
          sensorSign=0
          if item[1][:sensorSign]
            sensorSign=item[1][:sensorSign].to_i 
          end
          sen=Sensor.new(device_id:@device.id,name:item[1][:sensorName],sensorType:sensorType,sensorSign:sensorSign,sensorUnit:item[1][:sensorUnit])
          sen.save()
        end
        
        
      end
    end
    @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    respond_to do |format|
      format.json { render :json => {:code =>1,:msg =>"ok",:redirect_uri =>"/devices?pid="+@current_admin.id} }
    end
  end

  # DELETE /devices/1
  # DELETE /devices/1.json
  def destroy
    @device.destroy
    respond_to do |format|
      format.json { render :json => {:code =>1,:msg =>"Device was successfully destroyed.",:redirect_uri =>""} }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_device
      @device = Device.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def device_params
      params.require(:device).permit(:project_id, :device_name, :device_mark, :device_details, :device_img, :create_time, :lon, :lat)
    end
end
