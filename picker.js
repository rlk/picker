
var pitchNamesOfKey = {
    'c'  : { 1:'c',  2:'d',  3:'e',  4:'f',  5:'g',  6:'a',  7:'b'  },

    'g'  : { 1:'g',  2:'a',  3:'b',  4:'c',  5:'d',  6:'e',  7:'fs' },
    'd'  : { 1:'d',  2:'e',  3:'fs', 4:'g',  5:'a',  6:'b',  7:'cs' },
    'a'  : { 1:'a',  2:'b',  3:'cs', 4:'d',  5:'e',  6:'fs', 7:'gs' },
    'e'  : { 1:'e',  2:'fs', 3:'gs', 4:'a',  5:'b',  6:'cs', 7:'ds' },
    'b'  : { 1:'b',  2:'cs', 3:'ds', 4:'e',  5:'fs', 6:'gs', 7:'as' },
    'fs' : { 1:'fs', 2:'gs', 3:'as', 4:'b',  5:'cs', 6:'ds', 7:'es' },
    'cs' : { 1:'cs', 2:'ds', 3:'es', 4:'fs', 5:'gs', 6:'as', 7:'bs' },

    'f'  : { 1:'f',  2:'g',  3:'a',  4:'bf', 5:'c',  6:'d',  7:'e'  },
    'bf' : { 1:'bf', 2:'c',  3:'d',  4:'ef', 5:'f',  6:'g',  7:'a'  },
    'ef' : { 1:'ef', 2:'f',  3:'g',  4:'af', 5:'bf', 6:'c',  7:'d'  },
    'af' : { 1:'af', 2:'bf', 3:'c',  4:'df', 5:'ef', 6:'f',  7:'g'  },
    'df' : { 1:'df', 2:'ef', 3:'f',  4:'gf', 5:'af', 6:'bf', 7:'c'  },
    'gf' : { 1:'gf', 2:'af', 3:'bf', 4:'cf', 5:'df', 6:'ef', 7:'f'  },
    'cf' : { 1:'cf', 2:'df', 3:'ef', 4:'ff', 5:'gf', 6:'af', 7:'bf' },
};

var pitchClassOfPitchName = {
    'cf' : 11, 'c' :  0, 'cs' :  1,
    'df' :  1, 'd' :  2, 'ds' :  3,
    'ef' :  3, 'e' :  4, 'es' :  5,
    'ff' :  4, 'f' :  5, 'fs' :  6,
    'gf' :  6, 'g' :  7, 'gs' :  8,
    'af' :  8, 'a' :  9, 'as' : 10,
    'bf' : 10, 'b' : 11, 'bs' :  0,
};

var labelOfPitchName = {
    'cf' : 'C\u266d', 'c' : 'C', 'cs' : 'C\u266f',
    'df' : 'D\u266d', 'd' : 'D', 'ds' : 'D\u266f',
    'ef' : 'E\u266d', 'e' : 'E', 'es' : 'E\u266f',
    'ff' : 'F\u266d', 'f' : 'F', 'fs' : 'F\u266f',
    'gf' : 'G\u266d', 'g' : 'G', 'gs' : 'G\u266f',
    'af' : 'A\u266d', 'a' : 'A', 'as' : 'A\u266f',
    'bf' : 'B\u266d', 'b' : 'B', 'bs' : 'B\u266f',
};

var labelOfAccidental = {
    '-2' : '\ud834\udd2b',
    '-1' : '\u266d',
     '0' : '',
     '1' : '\u266f',
     '2' : '\ud834\udd2a',
};

var labelOfInterval = {
    '0'  : '1',
    '1'  : '\u266d2',
    '2'  : '2',
    '3'  : '\u266d3',
    '4'  : '3',
    '5'  : '4',
    '6'  : '\u266d5',
    '7'  : '5',
    '8'  : '\u266d6',
    '9'  : '6',
    '10' : '\u266d7',
    '11' : '7',
};

function majorTriad() {
    return [{ tone:  1, accidental:  0 },
            { tone:  3, accidental:  0 },
            { tone:  5, accidental:  0 }];
}

function minorTriad() {
    return [{ tone:  1, accidental:  0 },
            { tone:  3, accidental: -1 },
            { tone:  5, accidental:  0 }];
}

function seventhChord() {
    return [{ tone:  1, accidental:  0 },
            { tone:  3, accidental:  0 },
            { tone:  5, accidental:  0 },
            { tone:  7, accidental:  0 }];
}

function diminishedChord() {
    return [{ tone:  1, accidental:  0 },
            { tone:  3, accidental: -1 },
            { tone:  5, accidental: -1 },
            { tone:  7, accidental: -2 }];
}

function simplifyPitchName(s) {
    function simplifyAccidental(s) {
        if (s.match('sf'))
            return simplifyAccidental(s.replace('sf', ''));
        if (s.match('fs'))
            return simplifyAccidental(s.replace('fs', ''));
        return s;
    }
    return s[0] + simplifyAccidental(s.slice(1));
}

// Return a scale degree [1..7] for each given chord tone [1..13].

function degree(d, a) {
    a.forEach(function (n) {
        n.degree = ((n.tone - 1) + (d - 1)) % 7 + 1;
        n.root   = d;
    });
    return a;
}

// Determine the pitch name and class for each degree of a given key.

function key(k, a) {
    a.forEach(function (n) {
        n.pitchName  = pitchNamesOfKey[k][n.degree];
        n.pitchClass = pitchClassOfPitchName[n.pitchName];

        if (n.accidental) {
            if (n.accidental > 0) n.pitchName += 's'.repeat(+n.accidental);
            if (n.accidental < 0) n.pitchName += 'f'.repeat(-n.accidental);

            n.pitchClass += n.accidental;

            while (n.pitchClass <  0) n.pitchClass += 12;
            while (n.pitchClass > 11) n.pitchClass -= 12;

            n.pitchName = simplifyPitchName(n.pitchName);
        }

        var p = pitchNamesOfKey[k][n.root]
        var s = pitchClassOfPitchName[p];

        n.interval = (n.pitchClass >= s)
                   ? (n.pitchClass  - s)
                   : (n.pitchClass  - s + 12);
    });
    return a;
}

// Find all stops for each given pitch class on the given instrument.

function stopAll(instrument, a) {
    b = [];

    a.forEach(function (n) {
        for (var string = 1; string <= instrument.strings.length; string++) {
            for (var fret = 0; fret <= instrument.frets; fret++) {
                if ((instrument.strings[string] + fret) % 12 == n.pitchClass) {
                    m = Object.assign({}, n);
                    m.string     = string;
                    m.fret       = fret;
                    b.push(m);
                }
            }
        }
    });

    return b;
}

// Label each stop with its scale degree.

function labelScaleDegree(a) {
    a.forEach(function (n) {
        n.label = n.degree;
    });
    return a;
}

// Label each stop with its pitch name.

function labelPitch(a) {
    a.forEach(function (n) {
        n.label = labelOfPitchName[n.pitchName];
    });
    return a;
}

// Label each stop with its chord tone.

function labelChordTone(a) {
    a.forEach(function (n) {
        n.label = labelOfAccidental[n.accidental] + n.tone;
    });
    return a;
}

// Label each stop with its interval.

function labelInterval(a) {
    a.forEach(function (n) {
        n.label = labelOfInterval[n.interval];
    });
    return a;
}

function fretOfToneOnString(t, s, a) {
    var m = a.find(function (n) {
        return (n.tone == t && n.string == s);
    });
    return m.fret;
}

function position(f, c, a) {
    return a.filter(function (n) {
        return (f <= n.fret && n.fret <= f + c);
    });
}

//------------------------------------------------------------------------------

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

function groupSVG(x, y, a, e) {
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var t = [];

    if (x || y) t.push('translate(' + value(x) + ' '+ value(y) + ')');
    if (a)      t.push(   'rotate(' + value(a) +                 ')');

    if (t) g.setAttribute('transform', t.join(' '));

    Array.from(arguments).slice(3).map(function (e) { g.appendChild(e)});
    return g;
}

function createSVGElement(c, w, h, r) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    e.setAttribute('class',  c);

    if (r) {
        e.setAttribute('width',  value(h));
        e.setAttribute('height', value(w));
        e.setAttribute('transform', 'matrix(0 -1 1 0 0,' + value(w) + ')');
    } else {
        e.setAttribute('width',  value(w));
        e.setAttribute('height', value(h));
    }

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
        return groupSVG(x + w / 2, y + h / 2, 0, createSVGRect('fretboard', w, h));
    }

    // Create and position the nut geometry.

    function createNut() {
        var x = fretboardHSpace();
        var y = fretboardVSpace();
        var w = fretboardWidth();
        var h = layout.nutHeight;
        return groupSVG(x + w / 2, y + h / 2, 0, createSVGRect('nut', w, h));
    }

    // Create and position the geometry of string s.

    function createString(s) {
        var x = stringX(s);
        var y = fretboardVSpace();
        var h = fretboardHeight();
        return groupSVG(x, y + h / 2, 0, createSVGRect('string string' + s, 1, h));
   }

    // Create and position the geometry of fret f.

    function createFret(f) {
        var x = fretboardHSpace();
        var y = fretY(f);
        var w = fretboardWidth();
        return groupSVG(x + w / 2, y, 0, createSVGRect('fret fret' + f, w, 1));
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
            return groupSVG((xl + xr) / 2,
                                (yt + yb) / 2, 0,
                                createSVGCircle('marker marker' + f, r, -d),
                                createSVGCircle('marker marker' + f, r, +d));
        } else {
            return groupSVG((xl + xr) / 2,
                                (yt + yb) / 2, 0,
                                createSVGCircle('marker marker' + f, r));
        }
    }

    // Create, position, and label the given stop.

    function createStop(stop) {
        var x = stringX(stop.string);
        var y = fretY(stop.fret);
        var r = layout.stopRadius;
        var a = layout.horizontal ? 90 : 0;

        if (stop.fret > 0) y = y - r - r / 2;

        var s = stop.label;
        var l = (s.length > 2) ? layout.stopRadius * 1.5 : 0;

        var c = [
            'scaleDegree' + stop.degree,
            'chordTone'   + stop.tone,
            'pitchName'   + stop.pitch,
        ];

        return groupSVG(x, y, a, createSVGCircle('stop '  + c.join(' '), r),
                                 createSVGText  ('label ' + c.join(' '), s, l));
    }

    // Render a fretboard with the given class and set of stops.

    var h = fretboardHeight() + fretboardVSpace() * 2;
    var w = fretboardWidth()  + fretboardHSpace() * 2;

    var svg = createSVGElement(className, w, h, layout.horizontal);

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
        horizontal      : true,
    };

    var guitar = {
        strings : {
            1 : 76,
            2 : 71,
            3 : 67,
            4 : 62,
            5 : 57,
            6 : 52,
            length : 6
         },
         frets : 15
    };

    var a;

    a = labelInterval(stopAll(guitar, key('c', degree(1, seventhChord()))));
    b = position(fretOfToneOnString(1, 6, a) - 2, 4, a);
    document.body.appendChild(createFretboard('simple', layout, guitar, b));

    a = labelInterval(stopAll(guitar, key('c', degree(2, seventhChord()))));
    b = position(fretOfToneOnString(1, 6, a) - 2, 4, a);
    document.body.appendChild(createFretboard('simple', layout, guitar, b));

    a = labelInterval(stopAll(guitar, key('c', degree(3, seventhChord()))));
    b = position(fretOfToneOnString(1, 6, a) - 2, 4, a);
    document.body.appendChild(createFretboard('simple', layout, guitar, b));

    a = labelInterval(stopAll(guitar, key('c', degree(4, seventhChord()))));
    b = position(fretOfToneOnString(1, 6, a) - 2, 4, a);
    document.body.appendChild(createFretboard('simple', layout, guitar, b));

    a = labelInterval(stopAll(guitar, key('c', degree(5, seventhChord()))));
    b = position(fretOfToneOnString(1, 6, a) - 2, 4, a);
    document.body.appendChild(createFretboard('simple', layout, guitar, b));

    a = labelInterval(stopAll(guitar, key('c', degree(6, seventhChord()))));
    b = position(fretOfToneOnString(1, 6, a) - 2, 4, a);
    document.body.appendChild(createFretboard('simple', layout, guitar, b));

    a = labelInterval(stopAll(guitar, key('c', degree(7, seventhChord()))));
    b = position(fretOfToneOnString(1, 6, a) - 2, 4, a);
    document.body.appendChild(createFretboard('simple', layout, guitar, b));
}

