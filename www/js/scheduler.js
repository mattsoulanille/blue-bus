var alertTime;
var setAlert = function(){
	var now = new Date();
	alertTime = now;
	alertTime.setSeconds(now.getSeconds()+5);
}

var alertAtTime = function(){
	var now = new Date();
	var distance = alertTime.getSeconds()-now.getSeconds();
	console.log(distance);
	if(distance==0){
		alert("Time is up");
		setAlert();
	}
}

setAlert();
setInterval(alertAtTime, 1000);