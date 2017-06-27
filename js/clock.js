//business logic stuff for a particular module
var Clock = function() {
  this.alarms = [];
  this.time = "";
  this.alarmIsActive = false;
  this.snoozeInterval = 5;
  this.currentActiveAlarm = null;
};

Clock.prototype.currentTime = function() {
  var currentTime = moment();
  this.time = currentTime;
  return currentTime.format('h:mm A');
};

Clock.prototype.setAlarm = function(time) {
  var formattedTime = time.split(":");
  var newTime = moment().hour(formattedTime[0]).minute(formattedTime[1]);
  this.alarms.push(newTime);
}

Clock.prototype.checkAlarms = function() {
  var clock = this;
  this.alarms.forEach(function(alarm, index) {
    if (alarm.format('h:mm A') === clock.time.format('h:mm A')) {
      clock.alarmIsActive = true;
      clock.currentActiveAlarm = index;
    }
  });
  return clock.alarmIsActive;
}

Clock.prototype.clearAlarm = function() {
  this.alarmIsActive = false;
  this.alarms.splice(this.currentActiveAlarm, 1);
}

exports.clock = Clock;
