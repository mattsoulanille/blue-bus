$(document).ready(function(event){

  $('#HaverfordButton').click(function(){
    var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';

    cordova.plugins.notification.local.schedule({

        alert(Trying to schedule something);
        id: 1,
        text: 'Scheduled every minute',
        every: 'second',
        sound: sound,
        icon: 'res://icon',
        smallIcon: 'res://ic_popup_sync'
    });  });


  $('#BrynMawrButton').click(function(){
    alert("Just testing to make sure alerts still work");
  });
});