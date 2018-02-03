$(document).ready(function(event){
  MAINVIEW = "HAVERFORD";
  setView();

  $('#HaverfordButton').click(function(){
    MAINVIEW = "HAVERFORD"
    setView();
  });


  $('#BrynMawrButton').click(function(){
    MAINVIEW = "BRYNMAWR";
    setView();
  });
});
