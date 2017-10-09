/*
this could be done in a much more concise way if you split the tasks of calculating
the octaves and notes up into seperate functions.
*/

function getNoteAndOctave(keyNum) {
  const noteObj = {};
  if (keyNum >= 28 && keyNum <= 39) {
    noteObj['octave'] = 3;
  }
  else if (keyNum >= 40 && keyNum <= 51) {
    noteObj['octave'] = 4;
  }
  else if (keyNum >= 52 && keyNum <= 63) {
    noteObj['octave'] = 5;
  }
  const notesArray = ['G# / Ab', 'A', 'A# / Bb', 'B', 'C', 'C# / Db', 'D', 'D# / Eb', 'E', 'F', 'F# / Gb', 'G'];

  noteObj['note', notesArray[keyNum % 12]];
  return noteObj;
};

module.exports = getNoteAndOctave;
