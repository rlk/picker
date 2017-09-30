
// Modular arithmetic function that assumes a positive d and returns a value
// in the range [0..d) for all n, including negative values.

function mod(n, d) {
    return (n % d + d) % d;
}

//------------------------------------------------------------------------------

// Musical mappings and definitions.

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
    'cff' : 'C\ud834\udd2b', 'cf' : 'C\u266d', 'c' : 'C', 'cs' : 'C\u266f', 'css' : 'C\ud834\udd2a',
    'dff' : 'D\ud834\udd2b', 'df' : 'D\u266d', 'd' : 'D', 'ds' : 'D\u266f', 'dss' : 'D\ud834\udd2a',
    'eff' : 'E\ud834\udd2b', 'ef' : 'E\u266d', 'e' : 'E', 'es' : 'E\u266f', 'ess' : 'E\ud834\udd2a',
    'fff' : 'F\ud834\udd2b', 'ff' : 'F\u266d', 'f' : 'F', 'fs' : 'F\u266f', 'fss' : 'F\ud834\udd2a',
    'gff' : 'G\ud834\udd2b', 'gf' : 'G\u266d', 'g' : 'G', 'gs' : 'G\u266f', 'gss' : 'G\ud834\udd2a',
    'aff' : 'A\ud834\udd2b', 'af' : 'A\u266d', 'a' : 'A', 'as' : 'A\u266f', 'ass' : 'A\ud834\udd2a',
    'bff' : 'B\ud834\udd2b', 'bf' : 'B\u266d', 'b' : 'B', 'bs' : 'B\u266f', 'bss' : 'B\ud834\udd2a',
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

//------------------------------------------------------------------------------

// Common chord and scale generators.

function majorTriad() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental:  0 },
            { chordTone:  5, accidental:  0 }];
}

function minorTriad() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental: -1 },
            { chordTone:  5, accidental:  0 }];
}

function seventhChord() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental:  0 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  7, accidental:  0 }];
}

function ninthChord() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental:  0 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  7, accidental:  0 },
            { chordTone:  9, accidental:  0 }];
}

function eleventhChord() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental:  0 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  7, accidental:  0 },
            { chordTone:  9, accidental:  0 },
            { chordTone: 11, accidental:  0 }];
}

function diminishedSeventhChord() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental: -1 },
            { chordTone:  5, accidental: -1 },
            { chordTone:  7, accidental: -2 }];
}

function majorScale() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  2, accidental:  0 },
            { chordTone:  3, accidental:  0 },
            { chordTone:  4, accidental:  0 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  6, accidental:  0 },
            { chordTone:  7, accidental:  0 }];
}

function naturalMinorScale() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  2, accidental:  0 },
            { chordTone:  3, accidental: -1 },
            { chordTone:  4, accidental:  0 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  6, accidental: -1 },
            { chordTone:  7, accidental: -1 }];
}

function majorPentatonicScale() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  2, accidental:  0 },
            { chordTone:  3, accidental:  0 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  6, accidental:  0 }];
}

function minorPentatonicScale() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental: -1 },
            { chordTone:  4, accidental:  0 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  7, accidental: -1 }];
}

function bluesScale() {
    return [{ chordTone:  1, accidental:  0 },
            { chordTone:  3, accidental: -1 },
            { chordTone:  4, accidental:  0 },
            { chordTone:  5, accidental: -1 },
            { chordTone:  5, accidental:  0 },
            { chordTone:  7, accidental: -1 }];
}

//------------------------------------------------------------------------------

// Optimize a string of accidentals by eliminating flat-sharp and sharp-flat
// pairs.

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

//------------------------------------------------------------------------------

// Determine a scale degree [1..7] for each given chord tone [1..13].

function degree(d, notes) {
    notes.forEach(function (n) {
        n.scaleDegree = mod((n.chordTone - 1) - (d - 1), 7) + 1;
        n.root = d;
    });
    return notes;
}

// Map a set of notes into the given key: Determine the pitch name and pitch
// class appropriate for that key for each scale degree.

function key(k, notes) {
    notes.forEach(function (n) {
        if (!n.hasOwnProperty('scaleDegree')) {
            n.scaleDegree = (n.chordTone - 1) % 7 + 1;
        }

        n.pitchName  = pitchNamesOfKey[k][n.scaleDegree];
        n.pitchClass = pitchClassOfPitchName[n.pitchName];

        if (n.accidental) {
            if (n.accidental > 0) n.pitchName += 's'.repeat(+n.accidental);
            if (n.accidental < 0) n.pitchName += 'f'.repeat(-n.accidental);

            n.pitchName  = simplifyPitchName(n.pitchName);
            n.pitchClass = mod(n.pitchClass + n.accidental, 12);
        }
    });
    return notes;
}

//------------------------------------------------------------------------------

function copy(n) {
    return Object.assign({ }, n);
}

// Enumerate all stops with the given pitch class on the given string. Clone
// each note record and add the string and fret number. Call the gather function
// with each new record.

function gatherByPitchClassAndString(instrument, string, note, gather) {
    var open  = instrument.strings[string];
    var first = mod(note.pitchClass - open % 12, 12);

    for (var fret = first; fret <= instrument.frets; fret += 12) {
        var m    = copy(note);
        m.string = string;
        m.fret   = fret;
        m.note   = fret + open;
        gather(m);
    }
}

// Find all stops included in a given set of pitch classes on the given string.
// Call the gather function with each note found.

function gatherByPitchClassesAndString(instrument, string, notes, gather) {
    notes.forEach(function (note) {
        gatherByPitchClassAndString(instrument, string, note, gather);
    });
}

// Find all stops with the given pitch class across the given instrument. Call
// the gather function with each note found.

function gatherByPitchClass(instrument, note, gather) {
    for (var string of instrument.strings.keys()) {
        gatherByPitchClassAndString(instrument, string, note, gather);
    }
}

//------------------------------------------------------------------------------

// Organize an array of notes as an array of arrays indexed by note number.

function organizeByNote(notes) {
    return notes.reduce(function (accumulator, n) {
        if (accumulator[n.note] === undefined)
            accumulator[n.note] = [];
        accumulator[n.note].push(n);
        return accumulator;
    }, []);
}

// Organize an array of notes as an array of arrays indexed by fret number.

function organizeByFret(notes) {
    return notes.reduce(function (accumulator, n) {
        if (accumulator[n.fret] === undefined)
            accumulator[n.fret] = [];
        accumulator[n.fret].push(n);
        return accumulator;
    }, []);
}

// Organize an array of notes as an array of arrays indexed by string number.

function organizeByString(notes) {
    return notes.reduce(function (accumulator, n) {
        if (accumulator[n.string] === undefined)
            accumulator[n.string] = [];
        accumulator[n.string].push(n);
        return accumulator;
    }, []);
}

// Organize an array of arrays of notes as a flat array.

function organizeFlat(notes) {
    return notes.reduce(function (accumulator, n) {
        return accumulator.concat(n);
    }, []);
}

// Sort a flat array of notes by fret number.

function sortByFret(notes) {
    return notes.sort(function (a, b) {
        if (a.fret < b.fret) return -1;
        if (a.fret > b.fret) return +1;
        return 0;
    });
}

//------------------------------------------------------------------------------

// Find all stops on the given instrument for the given set of pitch clases.
// Receive the notes organized by string. Return the stops in a flat array.

function findStopsByString(instrument, notes) {
    var stops = [ ];
    notes.forEach(function (notes, string) {
        gatherByPitchClassesAndString(instrument, string, notes, function (n) {
            stops.push(n);
        });
    });
    return stops;
}

// Find all stops on the given instrument for the given set of pitch clases.
// Receive the notes in a flat array. Return the stops in a flat array.

function findStops(instrument, notes) {
    var stops = [ ];
    notes.forEach(function (note) {
        gatherByPitchClass(instrument, note, function (n) {
            stops.push(n);
        });
    });
    return stops;
}


// Filter a set of notes to include only those with selected scale degrees.

function filterScaleDegree(degrees, notes) {
    return notes.filter(function (n) {
        return degrees.includes(n.scaleDegree);
    });
}

//------------------------------------------------------------------------------

// Return a function defining an N-notes-per-string position. Such a position
// jumps to the next string when the current string has N stops and ends when
// all strings have N.

function chooseNotesPerString(count) {

    function choose(instrument, positionFirst, positionCount,
                                  stringFirst,   stringCount,
                                          nextStopSameString,
                                          nextStopNextString) {

        if (positionCount < count * instrument.strings.length) {
            if (stringCount < count)
                return nextStopSameString;
            else
                return nextStopNextString;
        }
        return false;
    }
    return choose;
}

// Return a function defining a position within the given range.

function chooseNotesWithinRange(min, max) {

    function choose(instrument, positionFirst, positionCount,
                                  stringFirst,   stringCount,
                                          nextStopSameString,
                                          nextStopNextString) {

        if (nextStopSameString &&
            nextStopSameString.fret - stringFirst.fret <= max)
            return nextStopSameString;

        if (nextStopNextString &&
            nextStopNextString.fret - stringFirst.fret <= max &&
            nextStopNextString.fret - stringFirst.fret >= min)
            return nextStopNextString;

        return false;
    }
    return choose;
}

// Copy the given note and annotate it with the given string and fret numbers.

function makeStop(note, string, fret) {
    var stop = copy(note);
    stop.string = string;
    stop.fret   = fret;
    return stop;
}

// Lay out a scale on an instrument, beginning at the given string and fret.

function positionScale(instrument, scale, string, index, choose) {

    var fret = mod(scale[index].pitchClass - instrument.strings[string] % 12, 12);

    var stops = [];
    var stop  = makeStop(scale[index], string, fret);

    var positionFirst = stop;
    var positionCount = 0;
    var   stringFirst = stop;
    var   stringCount = 0;

    // Keep going as long as stops are being generated.

    for (; stop; index++) {

        // Add the current stop and count it.

        stops.push(stop);
        positionCount++;
        stringCount++;

        // Determine the distance to the next stop.

        var i = (index + 0) % scale.length;
        var j = (index + 1) % scale.length;

        var d = mod(scale[j].pitchClass - scale[i].pitchClass, 12);

        var same = undefined;
        var next = undefined;

        // Create the next stop on the same string.

        same = copy(scale[j]);
        same.string = stop.string;
        same.fret   = stop.fret + d;

        // Create the next stop on the next string.

        if (stop.string > 0) {
            next = copy(scale[j]);
            next.string = stop.string - 1;
            next.fret   = stop.fret + d
                                    + instrument.strings[stop.string]
                                    - instrument.strings[stop.string - 1];
        }

        // Choose one of these two.

        stop = choose(instrument, positionFirst, positionCount,
                                    stringFirst,    stringCount, same, next);

        // Note having moved to the next string.

        if (next && stop === next) {
            stringFirst = stop;
            stringCount = 0;
        }
    }

    return stops;
}

//------------------------------------------------------------------------------

// Label each note in the given set with its scale degree.

function labelScaleDegree(notes) {
    notes.forEach(function (n) {
        n.label = n.scaleDegree;
    });
    return notes;
}

// Label each note in the given set with its pitch name.

function labelPitchName(notes) {
    notes.forEach(function (n) {
        n.label = labelOfPitchName[n.pitchName];
    });
    return notes;
}

// Label each note in the given set with its chord tone.

function labelChordTone(notes) {
    notes.forEach(function (n) {
        n.label = labelOfAccidental[n.accidental] + n.chordTone;
    });
    return notes;
}

//------------------------------------------------------------------------------

// Add a text node to the given HTML element and return the element.

function addTextNode(element, text) {
    var n = document.createTextNode(text);
    element.appendChild(n);
    return element;
}

// Create and return an HTML element with the given text.

function createTextElement(tag, text) {
    return addTextNode(document.createElement(tag), text);
}

// Format a number for printing. If floating point, limit precision to 2 digits.

function value(n) {
    if (Number.isInteger(n))
        return n;
    else
        return n.toFixed(2);
}

// Create and return a new SVG group element, translated to position (x, y) and
// rotated to angle a. Append the set of elements e as children.

function groupSVG(x, y, a, e) {
    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var t = [];

    if (x || y) t.push('translate(' + value(x) + ' '+ value(y) + ')');
    if (a)      t.push(   'rotate(' + value(a) +                 ')');

    if (t) g.setAttribute('transform', t.join(' '));

    Array.from(arguments).slice(3).map(function (e) { g.appendChild(e)});
    return g;
}

// Create and return a new SVG top level element with width w and height h.

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

// Create a new SVG text element at the origin with the given class and text.

function createSVGText(c, s, l) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    if (c) e.setAttribute('class', c);
    if (l) e.setAttribute('textLength', l);

    e.setAttribute('dy', 1);

    return addTextNode(e, s);
}

// Create a new SVG rendering of a fretboard using the given layout and
// instrument parameters, and the given list of stops.

function createFretboard(className, layout, instrument, stops) {

    // Calculate the position of fret f.

    function fretPosition(f) {
        return layout.nutLength
             + layout.stringLength
             - layout.stringLength / Math.pow(2, f / 12)
             - fretboardLength() / 2
    }

    // Calculate the position of string s.

    function stringPosition(s) {
        return layout.stringSpace * ((instrument.strings.length - 1) * 0.5 - s);
    }

    // Calculate the gap along the length of the fretboard.

    function fretboardWSpace() {
        return layout.fretboardWSpace
              + Math.max(layout.stopRadius - layout.stringOffset, 0);
    }

    // Calculate the gap at the ends of the fretboard.

    function fretboardLSpace() {
        return layout.fretboardLSpace
             + Math.max(layout.stopRadius - layout.nutLength, 0);
    }

    // Calculate the total fretboard length.

    function fretboardLength() {
        return layout.nutLength + layout.stringLength
                                - layout.stringLength / Math.pow(2, instrument.frets / 12);
    }

    // Calculate the total fretboard width.

    function fretboardWidth() {
        return layout.stringOffset * 2
             + layout.stringSpace * (instrument.strings.length - 1);
    }

    // Create and position the fretboard geometry.

    function createFretboard() {
        var w = fretboardWidth();
        var l = fretboardLength();
        return groupSVG(0, 0, 0, createSVGRect('fretboard', w, l));
    }

    // Create and position the nut geometry.

    function createNut() {
        var y = layout.nutLength / 2 - fretboardLength() / 2;
        var w = fretboardWidth();
        var l = layout.nutLength;
        return groupSVG(0, y, 0, createSVGRect('nut', w, l));
    }

    // Create and position the geometry of string s.

    function createString(s) {
        var x = stringPosition(s);
        var l = fretboardLength();
        return groupSVG(x, 0, 0, createSVGRect('string string' + s, 1, l));
   }

    // Create and position the geometry of fret f.

    function createFret(f) {
        var y = fretPosition(f);
        var w = fretboardWidth();
        return groupSVG(0, y, 0, createSVGRect('fret fret' + f, w, 1));
    }

    // Create and position the geometry of the fret marker at fret f.

    function createMarker(f) {
        var n = instrument.strings.length - 1;
        var r = layout.markerRadius;
        var d = layout.stringSpace;

        var yt = fretPosition(f - 0);
        var yb = fretPosition(f - 1);
        var xr = stringPosition(0);
        var xl = stringPosition(n);

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
        var x = stringPosition(stop.string);
        var y = fretPosition(stop.fret);
        var r = layout.stopRadius;
        var a = layout.horizontal ? 90 : 0;

        if (stop.fret > 0) y = y - r - r / 2;

        var c = ''

        if (stop.hasOwnProperty('scaleDegree')) c += ' scaleDegree' + stop.scaleDegree;
        if (stop.hasOwnProperty('chordTone'))   c += ' chordTone'   + stop.chordTone;
        if (stop.hasOwnProperty('pitchName'))   c += ' pitchName'   + stop.pitchName;
        if (stop.hasOwnProperty('string'))      c += ' string'      + stop.string;
        if (stop.hasOwnProperty('fret'))        c += ' fret'        + stop.fret;
        if (stop.hasOwnProperty('root'))        c += ' root'        + stop.root;

        if (stop.hasOwnProperty('label')) {
            var s = stop.label;
            var l = (s.length > 2) ? layout.stopRadius * 1.5 : 0;

            return groupSVG(x, y, a, createSVGCircle('stop'  + c, r),
                                     createSVGText  ('label' + c, s, l));
        } else {
            return groupSVG(x, y, a, createSVGCircle('stop'  + c, r));
        }
    }

    // Render a fretboard with the given class and set of stops.

    var l = fretboardLength() + fretboardLSpace() * 2;
    var w = fretboardWidth()  + fretboardWSpace() * 2;

    var svg;
    var top;

    if (layout.horizontal) {
        svg = createSVGElement(className, l, w);
        top = groupSVG(l / 2, w / 2, -90);
    } else {
        svg = createSVGElement(className, w, l);
        top = groupSVG(w / 2, l / 2, 0);
    }

    top.appendChild(createFretboard());
    top.appendChild(createNut());

    for (f of [ 3, 5, 7, 9, 12, 15, 17, 19, 21, 24 ]) {
        if (f <= instrument.frets)
            top.appendChild(createMarker(f));
    }

    for (var f = 1; f <= instrument.frets; f++) {
        top.appendChild(createFret(f));
    }
    for (var s = 0; s < instrument.strings.length; s++) {
        top.appendChild(createString(s));
    }
    stops.forEach(function (n) {
        if (0 <= n.fret   && n.fret   <= instrument.frets &&
            0 <= n.string && n.string <  instrument.strings.length)
                top.appendChild(createStop(n));
    });

    svg.appendChild(top);

    return svg;
}

// Generate an HTML table of note numbers.

function createNoteTable() {
    var table = document.createElement('table');
    var tr    = document.createElement('tr');

    tr.appendChild(createTextElement('th', ''));
    tr.appendChild(createTextElement('th', 'C'));
    tr.appendChild(createTextElement('th', 'C\u266f/D\u266d'));
    tr.appendChild(createTextElement('th', 'D'));
    tr.appendChild(createTextElement('th', 'D\u266f/E\u266d'));
    tr.appendChild(createTextElement('th', 'E'));
    tr.appendChild(createTextElement('th', 'F'));
    tr.appendChild(createTextElement('th', 'F\u266f/G\u266d'));
    tr.appendChild(createTextElement('th', 'G'));
    tr.appendChild(createTextElement('th', 'G\u266f/A\u266d'));
    tr.appendChild(createTextElement('th', 'A'));
    tr.appendChild(createTextElement('th', 'A\u266f/B\u266d'));
    tr.appendChild(createTextElement('th', 'B'));

    table.appendChild(tr);

    for (var octave = -2; octave < 9; octave++) {
        tr = document.createElement('tr');

        tr.appendChild(createTextElement('th', octave));

        for (var note = 12 * (octave + 2); note < 12 * (octave + 3); note++) {
            if (note < 128)
                tr.appendChild(createTextElement('td', note));
            else
                tr.appendChild(createTextElement('td', '-'));
        }

        table.appendChild(tr);
    }

    table.setAttribute('class', 'notes');
    return table;
}

//------------------------------------------------------------------------------

// Default layout structure.

var layout = {
    nutLength       :   10,
    stopRadius      :   10,
    stringOffset    :    6,
    stringSpace     :   20,
    stringLength    : 1000,
    markerRadius    :    6,
    fretboardWSpace :    2,
    fretboardLSpace :    2,
    horizontal      : true,
};

// Default guitar structure.

var guitar = {
    strings : [ 76, 71, 67, 62, 57, 52 ],
    frets : 17
};
