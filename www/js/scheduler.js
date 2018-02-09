$(document).ready(function(event){

  $('#HaverfordButton').click(function(){
    console.log("A button was clicked");
    var d = new Date();
    d.addSeconds(20); 
    cordova.plugins.notification.local.schedule({
                    id: 1999,
                    title: 'Sample',
                    message: 'checking',
                    date: d
    });
  });


  $('#BrynMawrButton').click(function(){
    alert("Why is this not showing?");
  });
});