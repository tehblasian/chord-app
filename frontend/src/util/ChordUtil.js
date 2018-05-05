import teoria, { Interval } from 'teoria';

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
    'minor7': {
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
            '6': 'b7',
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

export const getChordExtension = (root, chordQuality, note) => {
    const noteWithoutOctaveNumber = note.replace(/\d/, '');
    const interval = Interval.between(teoria.note(root), teoria.note(noteWithoutOctaveNumber)).toString();
    const intervalQuality = interval[0];
    const intervalValue = interval.slice(1);

    if (chordQuality === 'half-diminished') {
        chordQuality = 'minor7';
    }

    return chordExtensionIndex[chordQuality][intervalQuality][intervalValue];
}

