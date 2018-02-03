// Got code from https://www.w3schools.com/howto/howto_js_countdown.asp
// Set the date we're counting down to
var HaverfordDate = new Date("Feb 3, 2018 20:37:25").getTime();
var HaverfordDate2 = new Date("Feb 3, 2018 20:57:25").getTime();
var BrynMawrDate = new Date("Feb 3, 2018 21:37:25").getTime();
var BrynMawrDate2 = new Date("Feb 3, 2018 21:57:25").getTime();


// Update the count down every 1 second
var updateClock = function() {

  // Get todays date and time
  var now = new Date().getTime();
  //alert(MAINVIEW);
  // Find the distance between now an the count down date
  if (MAINVIEW == "HAVERFORD") {
    var distance1 = HaverfordDate - now;
    var distance2 = HaverfordDate2 - now;
  }
  else {
    var distance1 = BrynMawrDate - now;
    var distance2 = BrynMawrDate2 - now;
  }

  // Display the result in the element with id="demo"
  $("#main-clock").html(formatCountdown(distance1));
  $("#small-clock").html(formatCountdown(distance2));

  // If the count down is finished, write some text
  if (distance1 < 0) {
    clearInterval(updateClock);
    $("#main-clock").html("EXPIRED");
  }
  if (distance2 < 0) {
    clearInterval(updateClock);
    $("#small-clock").html("EXPIRED");
  }
}


var formatCountdown = function(distance) {
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return ('0' + hours).slice(-2) + "h "
        + ('0' + minutes).slice(-2) + "m " + ('0' + seconds).slice(-2) + "s ";
}


setInterval(updateClock, 1000);
