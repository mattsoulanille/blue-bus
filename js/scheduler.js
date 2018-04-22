var alertTime;
var setAlert = function(){
	var now = new Date();
	alertTime = now;
	alertTime.setSeconds(now.getSeconds()+5);
}

  $('#HaverfordButton').click(function(){
    console.log("A button was clicked");
    var d = new Date();
    d.addSeconds(20);
    cordova.plugins.notification.local.schedule({
                    id: 1999,
                    title: 'Sample',
                    message: 'checking',
    });
  });


  $('#BrynMawrButton').click(function(){
  });

  document.addEventListener("deviceready", function(){
 },true);
});
