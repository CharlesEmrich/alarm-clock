var Clock = require('./../js/clock.js').clock;
var alert = new Audio('http://trekcore.com/audio/redalertandklaxons/tas_red_alert.mp3');
alert.loop = true;
$(document).ready(function() {
  var ourClock = new Clock(parseInt($('input[name="snooze-length"]').val()));

  $('.current-time').text(ourClock.currentTime());
  setInterval(function() {
    $('.current-time').text(ourClock.currentTime());

    ourClock.checkAlarms();
    if (ourClock.alarmIsActive) {
      alert.play();
    }

  }, 1000);

  $('#set-alarm-form').submit(function(event) {
    event.preventDefault();
    var inputtedTime = $("input[name='time']").val();
    ourClock.setAlarm(inputtedTime);
    $('#set-alarm-form').css('display', 'none');
  });

  $('#snooze-settings').submit(function(e) {
    e.preventDefault();
    ourClock.snoozeInterval = parseInt($('input[name="snooze-length"]').val());
    $('#snooze-settings').css('display', 'none');
  });

  $('#snooze').click(function() {
    ourClock.snooze();
    alert.pause();
    alert.currentTime = 0;
  });

  $('.settings').click(function() {
    $('#snooze-settings').css('display', 'flex');
  });

  $('#dismiss-alarm').click(function() {
    ourClock.clearAlarm();
    alert.pause();
    alert.currentTime = 0;
  });

  $('#set-alarm').click(function() {
    $('#set-alarm-form').css('display', 'flex');
  });
});
