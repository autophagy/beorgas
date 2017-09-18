var Simple1DNoise = function() {
    var MAX_VERTICES = 256;
    var MAX_VERTICES_MASK = MAX_VERTICES -1;
    var amplitude = 0.7;
    var scale = 0.05;

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

  for (var x = 0; x < draw.width(); x+= 100*Math.random()) {
    var y = g.getVal(x);
    mountain.push([x,draw.height()-(300 + (150*y))])
  }

  mountain.push([2500,draw.height()]);
  return mountain;
}

var draw = SVG('svg').size(2500, 1000)

var gradient1 = draw.gradient('linear', function(stop) {
  stop.at(1, '#666566')
  stop.at(0, '#595759')
});

gradient1.from(0, 0).to(0, 1);

 var gr = draw.gradient('linear', function(stop) {
        stop.at(0, '#666566');
        stop.at(1, '#595759');
    });
    gr.from(0, 0).to(0, 1);

var gradient2 = draw.gradient('linear', function(stop) {
  stop.at(0, '#838282')
  stop.at(1, '#969698')
});
gradient2.from(0, 0).to(0, 1);


var gradient3 = draw.gradient('linear', function(stop) {
  stop.at(0, '#969698')
  stop.at(1, '#aeacac')
});

gradient3.from(0, 0).to(0, 1);

var polygon = draw.polygon(create_mountain(draw))
polygon.fill(gradient3).move(0, draw.height())

var polygon = draw.polygon(create_mountain(draw))
polygon.fill(gradient2).move(0, draw.height() + 50)

var polygon = draw.polygon(create_mountain(draw))
polygon.fill(gr).move(0, draw.height() + 100)
