
## Picker design notes

- Javascript arrays are not zero-indexed as such, so we're free to count beginning with 1 where convention dictates. In general, MIDI-derived concepts such as note, octave, and pitch class numbers are zero-indexed, while musically-derived concepts such as degree, tone, string, and finger are one-indexed.

- Draw either horizontal or vertical

- CSS styling
	https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_and_CSS

- A *note* [0...127] gives a pitch.
	- Middle C is note 60 pitch class 0 octave 3
	- Middle C is string 5 fret 3 on a standard guitar
	- http://computermusicresource.com/midikeys.html

- An *octave* [-2..8] is a span of 12 notes.
- A *pitch class* [0..11] is an element of an *octave*.

- A *pitch name* is the non-unique name of a pitch class, eg "C♯" or "D♭".
- A *key* is a set of pitches.
- A *degree* [1..7] is an index into a key.
- A *scale* is a set of degrees.
- A *tone* [1..13] is a modular index into a key
- A *chord* is a set of tones.

- An *instrument* is a fret count m plus a set of n notes giving open string tuning.
- A *stop* is a string [1..n] with a fret [0..m].
- A *finger* [1..4] indicates the finger associated with a given stop.
- A *position* is a vague span of 4 or 5 frets relative to a given base fret.

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

