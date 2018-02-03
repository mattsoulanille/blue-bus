$(document).ready(function(event){
  //alert("working");
  $('#HaverfordButton').click(function(){
    MAINVIEW = "HAVERFORD"
    updateClock();
    $('#main-clock').css({'background': 'red'});
  });

  $('#BrynMawrButton').click(function(){
    MAINVIEW = "BRYNMAWR";
    updateClock();
    $('#main-clock').css({'background': 'blue'});
  });

  $('#HaverfordButton').on('tap', function(){
    alert("wow!");
    $(this).hide();
  });
});
