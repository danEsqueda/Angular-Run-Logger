var Run = function(name, distance, hrs, mins, sec) {
  var run = {
    name: name,
    distance: distance,
    duration: {
      hrs: hrs,
      mins: mins,
      sec: sec,
    },
  }
  return run;
};

module.exports = Run;
