
## Picker design notes

- Javascript arrays are not zero-indexed as such, so we're free to count beginning with 1 where convention dictates. In general, MIDI-derived concepts such as note, octave, and pitch class numbers are zero-indexed, while musically-derived concepts such as degree, tone, string, and finger are one-indexed.

- Draw either horizontal or vertical

- CSS styling
	https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_and_CSS

- Elements to be drawn
	- fingerboard
	- nut
	- fret
	- string
	- marker
	- stop
		- labeled with
			- finger
			- degree
			- tone

- You can map a pitch onto a pitch class, but you can't map a pitch class onto a pitch.

- Example outputs

	- Chord explorer... Highlight all positions of a given chord, labeled by degree
	- Scale reference... Highlight all positions of a given scale in a given position
	- Arpeggio tutor... Highlight all chord tones in a given position

- Note record elements

	- chordTone: 7
	- scaleDegree: 7
	- root: 1
	- pitchName: "b"
	- pitchClass: 11
	- string: 4
	- fret: 2
	- note: 59
	- label: "B"

### Glossary

- A *note* [0...127] gives a pitch.

	- Middle C is note 60 pitch class 0 octave 3
	- Middle C is string 4 fret 3 on a standard guitar
	- http://computermusicresource.com/midikeys.html

- A *string* [0...n) gives an index into an array of open string notes.

- An *octave* [-2..8] is a span of 12 notes.

- A *pitch class* [0..11] is an element of an *octave*.

- A *pitch name* is the non-unique name of a pitch class, eg "A♯" or "B♭".

	- These are handled internally as 'as' and 'bf', etc., and are mapped onto the associated Unicode symbols for display.

- A *key* is a set of pitches, given by pitch name.

	- The use of pitch name instead of pitch class encodes the fact that different keys assign different names to individual elements. For example, the keys of B and F both include pitch class 10, but the key of B includes A♯ while the key of F includes B♭.

	- Each key includes 7 elements, with exactly one element per letter.

	- We do not accommodate any key that requires double accidentals in its signature. So, while E♭ is present, its equivalent D♯ is not. The enharmonic pair A♭ / G♯ is omitted completely.

- A *degree* [1..7] is an index into a key.

- A *scale* is a set of degrees.

- A *tone* [1..13] is a modular index into a key

	- This modularity encodes the fact that, for example, a 9th has the same pitch class as a 2nd, but sounds one octive higher. 

- An *accidental* [-2..2] modifies a chord tone.

- A *chord* is a set of tones with accidentals.

	- The use of tones rather than pitch classes allows a chord to unambiguously include, for example, both a 2nd and a 9th.

	- The encoding of chord elements as tones and accidentals rather than as degrees permits pitch labels to be generated appropriately for their key and use. For example, a C diminished 7th chord is notated with a flat-flat B instead of an A.

- An *instrument* is a fret count m plus a set of n notes giving open string tuning.

	- Strings are numbered beginning  with 1.
	- Frets are numbered beginning with 0, which corresponds to the open string.

- A *stop* is a string [0..n) with a fret [0..m].

- A *finger* [1..4] indicates the finger associated with a given stop.

- A *position* is a vague span of 4 or 5 frets relative to a given base fret.

- A *set* is a generic aggregation of notes

	- A set can represent a musical entity at most any level of detail. It might be an abstract chord voicing, a voicing mapped into a specific key, a list of stops giving that voicing on a particular instrument, a labeled and colored list indicating fingering, etc..

	- The general pattern of Picker usage is structured as a set of filters that receives an abstract set and iteratively adds information until a concrete representation emerges, as in this example.

### TODO

Ukelele examples
Melodic minor 3NPS
Stop set boolean operations
Figure out better text positioning
Purge obsolete functions
