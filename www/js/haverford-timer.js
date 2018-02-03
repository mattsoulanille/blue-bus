// Got code from https://www.w3schools.com/howto/howto_js_countdown.asp
// Set the date we're counting down to
var HaverfordDate = new Date("Feb 3, 2018 15:37:25").getTime();
var BrynMawrDate = new Date("Feb 3, 2018 16:37:25").getTime();


// Update the count down every 1 second
var updateClock = function() {

  // Get todays date and time
  var now = new Date().getTime();
  //alert(MAINVIEW);
  // Find the distance between now an the count down date
  if (MAINVIEW == "HAVERFORD") {
    var distance = HaverfordDate - now;
  }
  else {
    var distance = BrynMawrDate - now;
  }

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("main-clock").innerHTML = ('0' + hours).slice(-2) + "h "
  + ('0' + minutes).slice(-2) + "m " + ('0' + seconds).slice(-2) + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("main-clock").innerHTML = "EXPIRED";
  }
}


setInterval(updateClock, 1000);
