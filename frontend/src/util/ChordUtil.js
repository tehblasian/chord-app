import teoria, { Interval } from 'teoria';
import { Chord, Distance } from 'tonal';

const chordExtensionIndex = {
    'major': {
        'P': {
            '1': '1',
            '4': '4',
            '5': '5',
        },
        'm': {
            '2': 'b2',
            '3': '+2',
            '6': '#5',
            '7': '-',
        },
        'M': {
            '2': '2',
            '3': '3',
            '6': '6',
            '7': '-',
        },
        'A': {
            '1': 'b2',
            '2': '+2',
            '3': '4',
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
        'm': {
            '3': '#9',
            '7': 'b7',
        },
        'M': {
            '2': '9',
            '3': '3',
            '6': '13',
            '7': '7',
        },
        'A': {
            '1': '#15',
            '4': '#11',
            '5': '#5',
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
            '7': '-',
        },
        'm': {
            '3': '3',
            '7': '-',
        },
        'A': {
            '1': 'b2',
            '4': 'b5',
            '5': '6',
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
        'm': {
            '3': '#9',
            '7': '7',
        },
        'A': {
            '1': 'b2',
            '4': 'b5',
            '5': '13',
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
        'm': {
            '3': '#9',
            '7': '7',
        },
        'A': {
            '1': 'b9',
            '4': '#11',
            '5': 'b13',
        }
    },
}

const chordExtensionIndexBySemitones = {
    'major': ['1', 'b2', '2', '+2', '3', '4', 'b5', '5', '#5', '6', '-', '-'],
    'major7': ['1', '#15', '9', '#9', '3', '11', '#11', '5', '#5', '13', '-', '7'],
    'minor': ['1', 'b2', '2', '3', '-', '4', 'b5', '5', '6', 'M6', '7', 'M7'],
    'minor7': ['1', 'b2', '9', '3', '-', '11', 'b5', '5', '13', 'M13', '7', 'M7'],
    'dominant': ['1', 'b9', '9', '#9', '3', '11', '#11', '5', 'b13', '13', '7', '-'],
}

export const getAllChordNames = () => {
    const notes = ['C', 'Cb', 'C#', 'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#', 'Fb', 'G', 'Gb', 'G#', 'A', 'Ab', 'A#', 'B', 'Bb'];
    const allChordNames = notes.map(note => Chord.names().map(name => note + name));
    return [].concat.apply([], allChordNames);
}

export const validateChordName = name => Chord.exists(name);

export const getChordRoot = chord => {
    try {
        const root = Chord.notes(chord)[0];
        return root[0].toUpperCase() + root.slice(1);
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
    const semitones = Distance.semitones(root, noteWithoutOctaveNumber);
    return chordExtensionIndexBySemitones[chordQuality][semitones];
}

