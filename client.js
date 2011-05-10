function cls() {
	for(i = 0; i < 100; i++){
		$(".sqr")[i].style.backgroundColor = "#FFF";
		$(".sqr")[i].clicked = false;
	}
}


$(document).ready(function() {
	moves = [];
	
	for(i = 0; i < 100; i++){
		sqr = document.createElement("div");
		sqr.x = i % 10;
		sqr.y = Math.floor(i / 10);
		sqr.className = "sqr x" + sqr.x + " y" + sqr.y;
		sqr.clicked = false;
		$(skew).append(sqr);
	}
	var socket = new io.Socket("localhost", {port: 8000, rememberTransport: false}); 
	socket.connect();
	socket.on('message', function(msg) {
		$('#mail').prepend("<li>" + msg + "</li>");
		obj = JSON.parse(msg);
		cls();
		for(i = 0; i < obj.length; i++){
			$(".sqr.x" + obj[i].x + ".y" + obj[i].y)[0].style.backgroundColor = "#CCF";
			$(".sqr.x" + obj[i].x + ".y" + obj[i].y)[0].clicked = true;
		}
		
	});
	
	$(".sqr").mouseover(function() {
		if(!this.clicked){
			this.style.backgroundColor = "red";
		}
	});
	$(".sqr").mouseout(function() {
		if(!this.clicked){
			this.style.backgroundColor = "#FFF";
		}
	});
	$(".sqr").click(function() {
		if(this.clicked){
			this.style.backgroundColor = "#FFF";
			this.clicked = false;
			obj = {};
			obj.type = "rm_fill";
			obj.x = this.x;
			obj.y = this.y;
			txt = JSON.stringify(obj);
			socket.send(txt);
		} else {
			this.style.backgroundColor = "#CCF";
			obj = {};
			obj.type = "mk_fill";
			obj.x = this.x;
			obj.y = this.y;
			txt = JSON.stringify(obj);
			this.clicked = moves.push(obj);
			socket.send(txt);
		}
	});
	//$(sprite)[0].style.marginLeft = "-104px";
	//$(sprite)[0].style.marginTop = "-140px";
	//window.setInterval('$(sprite)[0].style.marginLeft = "" + ((parseInt($(sprite)[0].style.marginLeft) - 27)) + "px"', 100);
});
