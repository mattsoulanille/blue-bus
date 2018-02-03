$(document).ready(function(event){
  setView();

  $('#HaverfordButton').click(function(){
    MAINVIEW = "HAVERFORD"
    setView();
    $(this).css({'transform':'scale(0.9)', 'opacity':'0.6'})
    $('#BrynMawrButton').css({'transform':'', 'opacity':''})
    setView();
  });


  $('#BrynMawrButton').click(function(){
    MAINVIEW = "BRYNMAWR";
    setView();
    $(this).css({'transform':'scale(0.9)', 'opacity':'0.6'})
    $('#HaverfordButton').css({'transform':'', 'opacity':''})
  });
});
