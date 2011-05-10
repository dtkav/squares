var http = require('http'),  
io = require('socket.io'), // for npm, otherwise use require('./path/to/socket.io') 
clients = [];
sqrs = [];

server = http.createServer(function(req, res){ 
	 // your normal server code 
	 res.writeHead(200, {'Content-Type': 'text/html'}); 
	 res.end('<h1>Hello world</h1>'); 
});
server.listen(8000);
  
// socket.io 
var socket = io.listen(server); 
socket.on('connection', function(client){ 
	console.log("client connected");
	clients.push(client);
	client.send(JSON.stringify(sqrs));
	// new client is here! 
	client.on('message', function(msg){ 
		obj = JSON.parse(msg);
		if(obj.type == "rm_fill"){
			for(i = 0; i < sqrs.length; i++){
				if(sqrs[i].x == obj.x && sqrs[i].y == obj.y){
					sqrs.splice(i,1);
				}
			}
		} else {
			sqrs.push(obj);
		}
		for(i = 0; i < clients.length; i++){
			if(clients[i] != client){
				clients[i].send(JSON.stringify(sqrs));
			}
		}
	});
	client.on('disconnect', function(){console.log("dc");}) 
}); 

