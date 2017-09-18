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

  for (var x = 0; x < draw.width(); x+= Math.random()*100) {
    var y = g.getVal(x);
    mountain.push([x,draw.height()-(300 + y)])
  }

  mountain.push([2500,draw.height()]);
  return mountain;
}

var draw = SVG('svg').size(3000, 300)

var gr = draw.gradient('linear', function(stop) {
  stop.at(0, '#111111')
  stop.at(1, '#6f6f6f')
});

gr.from(0, 0).to(0, 1);

for (var p = 0; p <= 5; p++) {
  var polygon = draw.polygon(create_mountain(draw))
  polygon.fill(gr).move(0, (25 * (p-1)));
}
