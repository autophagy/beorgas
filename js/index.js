var incept = 678758400000;
var termination = 3253914000000;

renderRemainingTime();

function renderRemainingTime() {
  var curr = Date.now();
  document.getElementById("mori").value = (curr-incept)/(termination-incept);

  // Just need a rough estimation
  var delta = Math.floor(((termination-incept)-(curr-incept))/1000);
  var days = Math.floor(delta / (60*60*24));
  delta -= days * (60*60*24);
  var hours = Math.floor(delta / (60*60)) % 24;
  delta -= hours * (60*60);
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  var seconds = delta % 60;

  var total = [days, hours, minutes, seconds]
  document.getElementById("mori-remaining").innerHTML = total.join(" // ");
}

setInterval(function(){
  renderRemainingTime();
}, 1000);
