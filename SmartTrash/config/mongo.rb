MongoMapper.connection = Mongo::Connection.new('172.16.0.8', 27017)  
MongoMapper.database = 'smart_trash_development'
if defined?(PhusionPassenger)  
   PhusionPassenger.on_event(:starting_worker_process) do |forked|  
     MongoMapper.connection.connect if forked  
   end  
end  
