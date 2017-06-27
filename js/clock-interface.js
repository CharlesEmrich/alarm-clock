var Clock = require('./../js/clock.js').clock;


$(document).ready(function() {
  var ourClock = new Clock();

  $('.current-time').text(ourClock.currentTime());
  setInterval(function() {
    $('.current-time').text(ourClock.currentTime());

    ourClock.checkAlarms();
    if (ourClock.alarmIsActive) {
      console.log('alarm is sounding');
      // ourClock.clearAlarm();
    }

  }, 1000);

  $('#set-alarm-form').submit(function(event) {
    event.preventDefault();
    var inputtedTime = $("input[name='time']").val();
    ourClock.setAlarm(inputtedTime);
  });

  $('#snooze-settings').submit(function(e) {
    e.preventDefault();
    ourClock.snoozeInterval = parseInt($('input[name="snooze-length"]').val());
  });
  $('#dismiss-alarm').click(function() {
    ourClock.clearAlarm();
  });
});
