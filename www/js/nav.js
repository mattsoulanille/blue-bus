$(document).ready(function(event) {
  //MAINVIEW = "HAVERFORD";
  createScrollStop();
  setClocks();
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
    $(this).html(bus.toDateFormat(100000));
  });


  // Handles clock animations during scrolling
  $(window).scroll(function() {
    updateClocksCSS();
  });

  $(window).scrollStopped(function() {
    //alert("Scrolling has stopped!");
  })
});


updateClocksCSS = function() {
  $(".clock").each(function() {
    var pos1 = $("#main-clock").offset().top;
    var pos2 = $(".small-clock").offset().top;
    var dist0 = $(this).offset().top - $(document).scrollTop();
    var dist1 = $(this).offset().top - $(document).scrollTop() - pos1;
    var dist2 = $(this).offset().top - $(document).scrollTop() - pos2;

    // Makes the clocks invisible once they go under the top banner so that they don't poke out again on the other side
    if (dist0 < 50) {
      $(this).css({"opacity": 0});
    }

    // Else do the normal CSS interaction
    else {
      $(this).css({"transform": "scale("+ Math.min(1, 1 - 2* dist1 / $(document).height()) +")",
                   "opacity"  : (1 - 20 * dist2 / $(document).height())
      });
    }
  });
}


setClocks = function() {
  for (var i=0; i < NUM_CLOCKS; i++) {
    $("#times").append("<br><br>");
    $("#times").append('<div class="clock"><div id="small-clock-desc'+i+'" class="small-clock-desc">Next bus is in:</div><div id="small-clock'+i+'" class="small-clock">this is a small clock</div></div>');
  }
}

createScrollStop = function() {
  $.fn.scrollStopped = function(callback) {
    var that = this, $this = $(that);
    $this.scroll(function(ev) {
      clearTimeout($this.data('scrollTimeout'));
      $this.data('scrollTimeout', setTimeout(callback.bind(that), 250, ev));
    });
  };
}
