import teoria, { Interval } from 'teoria';
import { Chord } from 'tonal';

const chordExtensionIndex = {
    'major': {
        'P': {
            '1': '1',
            '4': '4',
            '5': '5',
        },
        'M': {
            '2': '2',
            '3': '3',
            '6': '6',
            '7': '-',
        },
        'A': {
            '1': 'b2',
            '2': 'b3',
            '4': 'b5',
            '5': '#5',
            '6': '-',
        }
    },
    'major7': {
        'P': {
            '1': '1',
            '4': '4',
            '5': '5',
        },
        'M': {
            '2': '9',
            '3': '3',
            '6': '13',
            '7': '7',
        },
        'A': {
            '1': '#15',
            '2': '#9',
            '4': '#11',
            '5': '#5',
            '6': '-',
        }
    },
    'minor': {
        'P': {
            '1': '1',
            '4': '4',
            '5': '5',
        },
        'M': {
            '2': '2',
            '3': 'M3',
            '6': 'M6',
            '7': 'M7',
        },
        'A': {
            '1': 'b2',
            '2': '3',
            '4': 'b5',
            '5': '6',
            '6': '7',
        }
    },
    'minor7': {
        'P': {
            '1': '1',
            '4': '11',
            '5': '5',
        },
        'M': {
            '2': '9',
            '3': 'M3',
            '6': 'M13',
            '7': 'M7',
        },
        'A': {
            '1': 'b2',
            '2': '3',
            '4': 'b5',
            '5': '13',
            '6': '7',
        }
    },
    'dominant': {
        'P': {
            '1': '1',
            '4': '11',
            '5': '5',
        },
        'M': {
            '2': '9',
            '3': '3',
            '6': '13',
            '7': 'M7',
        },
        'A': {
            '1': 'b9',
            '2': '#9',
            '4': '#11',
            '5': 'b13',
            '6': 'b7',
        }
    },
}

export const getAllChordNames = () => {
    const notes = ['C', 'Cb', 'C#', 'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#', 'Fb', 'G', 'Gb', 'G#', 'A', 'Ab', 'A#', 'B', 'Bb'];
    const allChordNames = notes.map(note => Chord.names().map(name => note + name));
    return [].concat.apply([], allChordNames);
}

export const validateChordName = name => Chord.exists(name);

export const getChordRoot = chord => {
    try {
        return teoria
            .chord(chord)
            .root
            .name()
            .toUpperCase();
    } catch (error) {
        return '';
    }
}

export const getChordQuality = chord => {
    try {
        let chordQuality = teoria.chord(chord).quality();
        if (chordQuality === 'augmented') {
            return 'dominant'; // Treat augmented chords as dominant chords
        } else if (chordQuality === 'minor' && chord.match(/[7-9]1[1-5]/) > 0) {
            return 'minor7'; // Check for minor 7th chords
        } else {
            return chordQuality;
        }
    } catch (error) {
        return '';
    }
}

export const getChordExtension = (root, chordQuality, note) => {
    const noteWithoutOctaveNumber = note.replace(/\d/, '');
    const interval = Interval.between(teoria.note(root), teoria.note(noteWithoutOctaveNumber)).toString();
    const intervalQuality = interval[0];
    const intervalValue = interval.slice(1);
    console.log(interval)
    if (chordQuality === 'half-diminished') {
        chordQuality = 'minor7';
    }

    return chordExtensionIndex[chordQuality][intervalQuality][intervalValue];
}

