
function setView(){
  updateClock();
  if (MAINVIEW == 'HAVERFORD') {
    $('#currentViewHeader').text('Haverford');
    $('#currentViewDesc').text('Going to Bryn Mawr');

    $('#currentViewHeader').removeClass('bmc-header');
    $('#currentViewHeader').addClass('hc-header');
    $('#currentViewDesc').removeClass('bmc-desc');
    $('#currentViewDesc').addClass('hc-desc');

    $('.time').css({'background': '#A60000'});
    $('.small-clock').css({'background': '#A60000'});

    $('#BrynMawrButton').css({'transform':'', 'opacity':''})
    $('#HaverfordButton').css({'transform':'scale(1)', 'opacity':'1'})

    //$('html').css({'overflow': 'hidden'});
  }
  else {
    $('#currentViewHeader').text('Bryn Mawr');
    $('#currentViewDesc').text('Going to Haverford');

    $('#currentViewHeader').removeClass('hc-header');
    $('#currentViewHeader').addClass('bmc-header');
    $('#currentViewDesc').removeClass('hc-desc');
    $('#currentViewDesc').addClass('bmc-desc');

    $('.time').css({'background': '#03335F'});
    $('.small-clock').css({'background': '#03335F'});

    $('#HaverfordButton').css({'transform':'', 'opacity':''})
    $('#BrynMawrButton').css({'transform':'scale(1)', 'opacity':'1'})

    //$('html').css({'overflow': 'auto'});
  }
}
