//business logic stuff for a particular module
var Clock = function(snoozeInterval) {
  this.alarms = [];
  this.time = "";
  this.alarmIsActive = false;
  this.snoozeInterval = snoozeInterval;
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
};

Clock.prototype.checkAlarms = function() {
  var clock = this;
  this.alarms.forEach(function(alarm, index) {
    if (alarm.format('h:mm A') === clock.time.format('h:mm A')) {
      clock.setAlarmState(true, index);
    }
  });
  return clock.alarmIsActive;
};

Clock.prototype.snooze = function() {
  this.alarms[this.currentActiveAlarm].add(this.snoozeInterval, 'm');
  this.setAlarmState(false, null);
};

Clock.prototype.clearAlarm = function() {
  this.alarms.splice(this.currentActiveAlarm, 1);
  this.setAlarmState(false, null);
};

Clock.prototype.setAlarmState = function(alarmIsActive, currentActiveAlarm) {
  this.alarmIsActive = alarmIsActive;
  this.currentActiveAlarm = currentActiveAlarm;
};

exports.clock = Clock;
