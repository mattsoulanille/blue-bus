
function setView(){
  updateClock();
  if (MAINVIEW == 'HAVERFORD') {
    $('#currentViewHeader').text('Haverford');
    $('#currentViewDesc').text('Going to Bryn Mawr');

    $('#currentViewHeader').removeClass('bmc-header');
    $('#currentViewHeader').addClass('hc-header');
    $('#currentViewDesc').removeClass('bmc-desc');
    $('#currentViewDesc').addClass('hc-desc');

    $('#main-clock').css({'background': '#A60000'});
    $('#small-clock').css({'background': '#A60000'});
  }
  else {
    $('#currentViewHeader').text('Bryn Mawr');
    $('#currentViewDesc').text('Going to Haverford');

    $('#currentViewHeader').removeClass('hc-header');
    $('#currentViewHeader').addClass('bmc-header');
    $('#currentViewDesc').removeClass('hc-desc');
    $('#currentViewDesc').addClass('bmc-desc');

    $('#main-clock').css({'background': '#03335F'});
    $('#small-clock').css({'background': '#03335F'});
  }
}
