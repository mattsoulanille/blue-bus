$(document).ready(function(event) {
  MAINVIEW = "HAVERFORD";
  setView();
  updateClocksCSS();

  $('#HaverfordButton').click(function() {
    MAINVIEW = "HAVERFORD"
    setView();
  });


  $('#BrynMawrButton').click(function() {
    MAINVIEW = "BRYNMAWR";
    setView();
  });


  $('.time').click(function() {
    $(this).html(bus.toDateFormat(1000));
  });

  for (var i=0; i < 10; i++) {
    $("#times").append("<br><br>");
    $("#times").append('<div class="clock"><div id="small-clock-desc">Next bus is in:</div><div id="small-clock" class="time">this is a small clock</div></div>');
  }


  // Handles clock animations during scrolling
  $(window).scroll(function() {
    updateClocksCSS();
  });
});


updateClocksCSS = function() {
  $(".clock").each(function() {
    var pos1 = $("#main-clock").offset().top;
    var pos2 = $("#small-clock").offset().top;
    var dist0 = $(this).offset().top - $(document).scrollTop();
    var dist1 = $(this).offset().top - $(document).scrollTop() - pos1;
    var dist2 = $(this).offset().top - $(document).scrollTop() - pos2;
    
    if (dist0 < 50) {
      $(this).css({"opacity": 0});
    }
    else {
      $(this).css({"transform": "scale("+ Math.min(1, 1 - 2* dist1 / $(document).height()) +")",
                   "opacity"  : (1 - 20 * dist2 / $(document).height())
      });
    }
  });
}
