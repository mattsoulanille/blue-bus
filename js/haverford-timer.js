// Got code from https://www.w3schools.com/howto/howto_js_countdown.asp
// Set the date we're counting down to
// Update the count down every 1 second
var bus = new nextBusTime();
var updateClock = function() {
  // Get todays date and time
  var now = new Date();
  var day = now.getDay();
  day = ((day-1)+7)%7;
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var totalSeconds = day*(24*60*60) + hours*(60*60) + minutes*60 + seconds;
  var secondsInWeek = 7*24*60*60;
  //alert(MAINVIEW);
  // Find the distance between now an the count down date
  if (MAINVIEW == "HAVERFORD") {
    var nextBuses = bus.getNextBuses("Haverford",2 + NUM_CLOCKS);
  }
  else {
    var nextBuses = bus.getNextBuses("BrynMawr",2 + NUM_CLOCKS);
  }

  var distance1;
  var distance2;
  var distance;
  nextBuses.then(function(dates){
    for (var i = 0; i < NUM_CLOCKS; i++) {
      if(dates[i+2]<totalSeconds){
        var timeUntilStartOfWeek = secondsInWeek - totalSeconds;
        distance = timeUntilStartOfWeek + dates[i+2];
      }
      else{
        distance = dates[i+2] - totalSeconds;
      }
      $("#small-clock" + i).html(formatCountdown(distance*1000));
      $("#small-clock-desc" + i).html(bus.toDateFormat(dates[i+2], false) + " bus leaves in:");
    }
    //check to see if we're at Sunday night and the next bus is Monday morning
    if(dates[0]<totalSeconds){
      var timeUntilStartOfWeek = secondsInWeek - totalSeconds;
      distance1 = timeUntilStartOfWeek + dates[0];
    }
    else{
      distance1 = dates[0] - totalSeconds;
    }
    if(dates[1]<totalSeconds){
      var timeUntilStartOfWeek = secondsInWeek - totalSeconds;
      distance2 = timeUntilStartOfWeek + dates[1];
    }
    else{
      distance2 = dates[1] - totalSeconds;
    }
    $("#main-clock").html(formatCountdown(distance1*1000));
    $("#main-clock-desc").html("Bus leaves in:");
    $("#small-clock").html(formatCountdown(distance2*1000));
    $("#small-clock-desc").html(bus.toDateFormat(dates[1], false) + " bus leaves in:");
  });


  // Display the result in the element with id="demo"
  $("#small-clock").html(formatCountdown(distance2));

  // If the count down is finished, write some text
  if (distance1 < 0) {
    clearInterval(updateClock);
  }
  if (distance2 < 0) {
    clearInterval(updateClock);
  }
}


var formatCountdown = function(distance) {
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //format the time into a nice string format
  if(hours == 0){
    if(minutes == 0){
      return seconds +"s";
    }
    return minutes + "m " + ('0' + seconds).slice(-2) + "s"
  }
  if(minutes == 0){
    ('0' + seconds).slice(-2) + "s ";
  }
  return hours + "h "
        + ('0' + minutes).slice(-2) + "m " + ('0' + seconds).slice(-2) + "s ";
}


setInterval(updateClock, 1000);
