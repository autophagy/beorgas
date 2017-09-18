// MORI

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
  document.getElementById("mori-remaining").innerHTML = "[ " + total.join(" :: ") + " ]";
}

setInterval(function(){
  renderRemainingTime();
}, 1000);


// BEORGAS RENDERING
// Simple1DNoise taken from: https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/

var Simple1DNoise = function() {
    var MAX_VERTICES = 256;
    var MAX_VERTICES_MASK = MAX_VERTICES -1;
    var amplitude = 150;
    var scale = 0.001;

    var r = [];

    for ( var i = 0; i < MAX_VERTICES; ++i ) {
        r.push(Math.random());
    }

    var getVal = function( x ){
        var scaledX = x * scale;
        var xFloor = Math.floor(scaledX);
        var t = scaledX - xFloor;
        var tRemapSmoothstep = t * t * ( 3 - 2 * t );

        /// Modulo using &#038;
        var xMin = xFloor & MAX_VERTICES_MASK;
        var xMax = ( xMin + 1 ) & MAX_VERTICES_MASK;

        var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

        return y * amplitude;
    };

    /**
    * Linear interpolation function.
    * @param a The lower integer value
    * @param b The upper integer value
    * @param t The value between the two
    * @returns {number}
    */
    var lerp = function(a, b, t ) {
        return a * ( 1 - t ) + b * t;
    };

    // return the API
    return {
        getVal: getVal,
        setAmplitude: function(newAmplitude) {
            amplitude = newAmplitude;
        },
        setScale: function(newScale) {
            scale = newScale;
        }
    };
};

function create_mountain(draw) {
  mountain = [[0,draw.height()]];

  var g = new Simple1DNoise();

  for (var x = 0; x < draw.width(); x+= 5) {
    var y = g.getVal(x);
    mountain.push([x,draw.height()-(300 + y)]);
  }

  mountain.push([2500,draw.height()]);
  return mountain;
}

function render_mountains(mountain_array) {
  for (var r = 0; r < mountain_array.length; r++) {
    var polygon = draw.polygon(mountain_array[r]);
    polygon.fill(gr).move(0, 300 + (25 * (r-1)));
  }
}

var draw = SVG('beorgas').size(3000, 700);

var gr = draw.gradient('linear', function(stop) {
  stop.at(0, '#111111');
  stop.at(1, '#6f6f6f');
});

gr.from(0, 0).to(0, 1);

var noiseGenerators = [];
var mountains = [];

for (var p = 0; p <= 10; p++) {
  var g = new Simple1DNoise();
  var mountain = create_mountain(draw, g);
  noiseGenerators.push(g);
  mountains.push(mountain);
}

render_mountains(mountains);
