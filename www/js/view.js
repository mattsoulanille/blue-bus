
function setView(){
  updateClock();
  if (MAINVIEW == 'HAVERFORD') {
    $('#currentViewHeader').text('Haverford');
    $('#currentViewDesc').text('Going to Bryn Mawr');

    $('#currentViewHeader').removeClass('bmc-header');
    $('#currentViewHeader').addClass('hc-header');
    $('#currentViewDesc').removeClass('bmc-desc');
    $('#currentViewDesc').addClass('hc-desc');
  }
  else {
    $('#currentViewHeader').text('Bryn Mawr');
    $('#currentViewDesc').text('Going to Haverford');

    $('#currentViewHeader').removeClass('hc-header');
    $('#currentViewHeader').addClass('bmc-header');
    $('#currentViewDesc').removeClass('bmc-desc');
    $('#currentViewDesc').addClass('hc-desc');
  }
}
