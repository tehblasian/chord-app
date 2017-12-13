import { INITIALIZE_KEYS_ARRAY, KEY_PRESSED } from '../actions/actionTypes';
import analyzer from '../analyzer';

let initialState = {
    octaves: 3,
    keys: [],
    selectedKeys: [],
    currentChord: null
}

const keyReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_KEYS_ARRAY: {
            return {
                ...state, keys: initializeKeys(state.octaves)
            }
        }
        case KEY_PRESSED: {
            var nextState = {
                ...state,
                keys: state.keys.map((key) => {
                    if (key.id === action.payload) {
                        return {
                            ...key, isClicked: !key.isClicked
                        }
                    }
                    else return key;
                }),
            }
            nextState = {
                ...nextState, 
                selectedKeys: nextState.keys.filter((key) => {
                    return key.isClicked == true;
                }).map((key) => {
                    return key.id;
                })
            }
            
            return nextState;
        }    

        default: return state;    
    }
}

export default keyReducer;

const initializeKeys = (octaves) => {
    var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var alt = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    var octave;
    var a = [];
    var b = [];
    for (octave = 0; octave < octaves; octave++) {
        a = a.concat(notes);
        b = b.concat(alt);
    }
    
    var keys = a.map((key, index) => {
        if (index < 12)
            return {
                id: key + '3',
                isClicked: false
            }
        else if (index > 11 && index < 24)
            return {
                id: key + '4',
                isClicked: false
            }
        else if (index > 22)
            return {
                id: key + '5',
                isClicked: false
            }
    })

    return keys.map((key, index) => {
        if (key.id.indexOf('#') > 0) {
            if (index < 12)
                return {
                    ...key,
                    alt: b[index] + '3',
                }
            else if (index > 11 && index < 24)
                return {
                    ...key,
                    alt: b[index] + '4'
                }
            else if (index > 22)
                return {
                    ...key, alt: b[index] + '5'
                }
        }
        else return {
            ...key, alt: null
        };
    })
}
