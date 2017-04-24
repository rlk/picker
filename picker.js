
var semitoneOfPitch = {
    'cf' : 11, 'c' :  0, 'cs' :  1,
    'df' :  1, 'd' :  2, 'ds' :  3,
    'ef' :  3, 'e' :  4, 'es' :  5,
    'ff' :  4, 'f' :  5, 'fs' :  6,
    'gf' :  6, 'g' :  7, 'gs' :  8,
    'af' :  8, 'a' :  9, 'as' : 10,
    'bf' : 10, 'b' : 11, 'bs' :  0,
};

var nameOfPitch = {
    'cf' : "C&flat;", 'c' : "C", 'cs' : "C&sharp;",
    'df' : "D&flat;", 'd' : "D", 'ds' : "D&sharp;",
    'ef' : "E&flat;", 'e' : "E", 'es' : "E&sharp;",
    'ff' : "F&flat;", 'f' : "F", 'fs' : "F&sharp;",
    'gf' : "G&flat;", 'g' : "G", 'gs' : "G&sharp;",
    'af' : "A&flat;", 'a' : "A", 'as' : "A&sharp;",
    'bf' : "B&flat;", 'b' : "B", 'bs' : "B&sharp;",
};

var key = {
    'c'  : [ 'c',  'd',  'e',  'f',  'g',  'a',  'b'  ],

    'g'  : [ 'g',  'a',  'b',  'c',  'd',  'e',  'fs' ],
    'd'  : [ 'd',  'e',  'fs', 'g',  'a',  'b',  'cs' ],
    'a'  : [ 'a',  'b',  'cs', 'd',  'e',  'fs', 'gs' ],
    'e'  : [ 'e',  'fs', 'gs', 'a',  'b',  'cs', 'ds' ],
    'b'  : [ 'b',  'cs', 'ds', 'e',  'fs', 'gs', 'as' ],
    'fs' : [ 'fs', 'gs', 'as', 'b',  'cs', 'ds', 'es' ],
    'cs' : [ 'cs', 'ds', 'es', 'fs', 'gs', 'as', 'bs' ],

    'f'  : [ 'f',  'g',  'a',  'bf', 'c',  'd',  'e'  ],
    'bf' : [ 'bf', 'c',  'd',  'ef', 'f',  'g',  'a'  ],
    'ef' : [ 'ef', 'f',  'g',  'af', 'bf', 'c',  'd'  ],
    'af' : [ 'af', 'bf', 'c',  'df', 'ef', 'f',  'g'  ],
    'df' : [ 'df', 'ef', 'f',  'gf', 'af', 'bf', 'c'  ],
    'gf' : [ 'gf', 'af', 'bf', 'cf', 'df', 'ef', 'f'  ],
    'cf' : [ 'cf', 'df', 'ef', 'ff', 'gf', 'af', 'bf' ],
};

// Add a text node to the given element and return the element.

addTextNode = function(element, text) {
    var n = document.createTextNode(text);
    element.appendChild(n);
    return element;
}

function value(n) {
    if (Number.isInteger(n))
        return n;
    else
        return n.toFixed(2);
}

function translateSVG(x, y) {
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    g.setAttribute('transform', 'translate(' + value(x) + ' '
                                             + value(y) + ')');

    Array.from(arguments).slice(2).map(function (e) { g.appendChild(e)});
    return g;
}

function createSVGElement(c, w, h) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    e.setAttribute('class',  c);
    e.setAttribute('width',  value(w));
    e.setAttribute('height', value(h));

    return e;
}

// Create a new SVG rect element at the origin with the given width and height.

function createSVGRect(c, w, h, x, y) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    if (w && !x) x = -w / 2;
    if (h && !y) y = -h / 2;

    if (c) e.setAttribute('class',  c);
    if (x) e.setAttribute('x',      value(x));
    if (y) e.setAttribute('y',      value(y));
    if (w) e.setAttribute('width',  value(w));
    if (h) e.setAttribute('height', value(h));

    return e;
}

// Create a new SVG circle element at the origin with the given radius.

function createSVGCircle(c, r, x, y) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    if (c) e.setAttribute('class',  c);
    if (r) e.setAttribute('r',  value(r));
    if (x) e.setAttribute('cx', value(x));
    if (y) e.setAttribute('cy', value(y));

    return e;
}

function createSVGText(c, s, l) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    if (c) e.setAttribute('class', c);
    if (l) e.setAttribute('textLength', l);

    e.setAttribute('dy', 1);

    return addTextNode(e, s);
}

function createFretboard(className, layout, instrument, stops) {

    // Calculate the Y position of fret f.

    function fretY(f) {
        return fretboardVSpace()
             + layout.nutHeight
             + layout.stringLength
             - layout.stringLength / Math.pow(2, f / 12);
    }

    // Calculate the X position of string s.

    function stringX(s) {
        return fretboardHSpace()
             + layout.stringOffset
             + layout.stringSpace * (instrument.strings.length - s);
    }

    // Calculate the horizontal gap to the left and right of the fretboard.

    function fretboardHSpace() {
        return layout.fretboardHSpace
              + Math.max(layout.stopRadius - layout.stringOffset, 0);
    }

    // Calculate the vertical gap above and below the fretboard.

    function fretboardVSpace() {
        return layout.fretboardVSpace
             + Math.max(layout.stopRadius - layout.nutHeight, 0);
    }

    // Calculate the total fretboard height.

    function fretboardHeight() {
        return layout.nutHeight + fretY(instrument.frets);
    }

    // Calculate the total fretboard width.

    function fretboardWidth() {
        return layout.stringOffset * 2
             + layout.stringSpace * (instrument.strings.length - 1);
    }

    // Create and position the fretboard geometry.

    function createFretboard() {
        var x = fretboardHSpace();
        var y = fretboardVSpace();
        var w = fretboardWidth();
        var h = fretboardHeight();
        return translateSVG(x + w / 2, y + h / 2, createSVGRect('fretboard', w, h));
    }

    // Create and position the nut geometry.

    function createNut() {
        var x = fretboardHSpace();
        var y = fretboardVSpace();
        var w = fretboardWidth();
        var h = layout.nutHeight;
        return translateSVG(x + w / 2, y + h / 2, createSVGRect('nut', w, h));
    }

    // Create and position the geometry of string s.

    function createString(s) {
        var x = stringX(s);
        var y = fretboardVSpace();
        var h = fretboardHeight();
        return translateSVG(x, y + h / 2, createSVGRect('string string' + s, 1, h));
   }

    // Create and position the geometry of fret f.

    function createFret(f) {
        var x = fretboardHSpace();
        var y = fretY(f);
        var w = fretboardWidth();
        return translateSVG(x + w / 2, y, createSVGRect('fret fret' + f, w, 1));
    }

    // Create and position the geometry of the fret marker at fret f.

    function createMarker(f) {
        var n = instrument.strings.length
        var r = layout.markerRadius;
        var d = layout.stringSpace;

        var yt = fretY(f - 0);
        var yb = fretY(f - 1);
        var xr = stringX(1);
        var xl = stringX(n);

        if (f == 12 || f == 24) {
            return translateSVG((xl + xr) / 2,
                                (yt + yb) / 2,
                                createSVGCircle('marker marker' + f, r, -d),
                                createSVGCircle('marker marker' + f, r, +d));
        } else {
            return translateSVG((xl + xr) / 2,
                                (yt + yb) / 2,
                                createSVGCircle('marker marker' + f, r));
        }
    }

    function createLabel(s) {

    }

    // Create, position, and label the given stop.

    function createStop(stop) {
        var x = stringX(stop.string);
        var y = fretY(stop.fret);
        var r = layout.stopRadius;

        if (stop.fret > 0) y = y - r - r / 2;

        var s = stop.tone || stop.pitch || stop.degree || stop.finger;
        var l = (s.length > 2) ? layout.stopRadius * 1.5 : 0;

        return translateSVG(x, y, createSVGCircle('stop', r),
                                  createSVGText  ('label', s, l));
    }

    // Render a fretboard with the given class and set of stops.

    var h = fretboardHeight() + fretboardVSpace() * 2;
    var w = fretboardWidth()  + fretboardHSpace() * 2;

    var svg = createSVGElement(className, w, h);

    svg.appendChild(createFretboard());
    svg.appendChild(createNut());

    for (f of [ 3, 5, 7, 9, 12, 15, 17, 19, 21, 24 ]) {
        if (f <= instrument.frets)
            svg.appendChild(createMarker(f));
    }

    for (var f = 1; f <= instrument.frets; f++) {
        svg.appendChild(createFret(f));
    }
    for (var s = 1; s <= instrument.strings.length; s++) {
        svg.appendChild(createString(s));
    }
    for (var i = 0; i < stops.length; i++) {
        svg.appendChild(createStop(stops[i]));
    }

    return svg;
}

//------------------------------------------------------------------------------

function test() {
    var layout = {
        nutHeight       :   10,
        stopRadius      :   10,
        stringOffset    :    6,
        stringSpace     :   20,
        stringLength    : 1000,
        markerRadius    :    6,
        fretboardHSpace :    2,
        fretboardVSpace :    2,
    };

    var guitar = {
        strings : [ 76, 71, 67, 62, 57, 52 ], frets : 15
    };

    var c = [
        { string: 5, fret: 3, finger: '3' },
        { string: 4, fret: 2, pitch: 'B\u266d'},
        { string: 3, fret: 0, tone: '\u266d7' },
        { string: 2, fret: 1, tone: '\u266f11' },
        { string: 1, fret: 0, tone: '\uD834\uDD2B7' },
    ];

    document.body.appendChild(createFretboard('default', layout, guitar, c));
    document.body.appendChild(createFretboard('simple', layout, guitar, c));
}

