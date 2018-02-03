$(document).ready(function(event){
  setView();

  $('#HaverfordButton').click(function(){
    MAINVIEW = "HAVERFORD"
    setView();
    $('#main-clock').css({'background': '#A60000'});
    $(this).css({'transform': 'scale(0.85)'})
    $('#BrynMawrButton').css({'transform': 'scale(1)'})
    setView();
  });


  $('#BrynMawrButton').click(function(){
    MAINVIEW = "BRYNMAWR";
    setView();
    $('#main-clock').css({'background': '#03335F'});
    $(this).css({'transform': 'scale(0.85)'})
    $('#HaverfordButton').css({'transform': 'scale(1)'})
  });
});
