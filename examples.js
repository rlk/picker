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
    strings : [ 76, 71, 67, 62, 57, 52 ],
    frets : 15
};

// Major scale in all positions.

function majorScaleAllPositions(k) {
    var b = labelPitchName(stopsAll(guitar, key(k, majorScale())));
    document.body.appendChild(createFretboard('simple', layout, guitar, b));
}

// Major scale in in CAGED positions. (Really only works in 'C'.)

function majorScaleCAGED(k) {
    for (var fret of [1, 4, 6, 9, 11]) {
        var b = labelPitchName(stopsNearestFret(17, fret, stopsByNote(guitar, key(k, majorScale()))));
        document.body.appendChild(createFretboard('simple', layout, guitar, b));
    }
}

// Seventh chord tones in CAGED positions. (Really only works in 'C'.)

function seventhChordTonesCAGED(k) {
    for (var fret of [1, 4, 6, 9, 11]) {
        var b = labelPitchName(filterScaleDegree([1, 3, 5, 7], stopsNearestFret(17, fret, stopsByNote(guitar, key(k, majorScale())))));
        document.body.appendChild(createFretboard('simple', layout, guitar, b));
    }
}

// Seventh chords for all seven scale degrees.

function seventhChordScale(k) {
    for (var d of [1, 2, 3, 4, 5, 6, 7]) {
        var b = labelInterval(stopsAll(guitar, key(k, degree(d, seventhChord()))));
        document.body.appendChild(createFretboard('simple', layout, guitar, b));
    }
}

// Diminished chord.

function diminishedChordAllPositions(k) {
    var b = labelPitchName(stopsAll(guitar, key(k, degree(1, diminishedChord()))));
    document.body.appendChild(createFretboard('simple', layout, guitar, b));
}

function test() {
    document.body.appendChild(createNoteTable());
    majorScaleAllPositions('c');
}
