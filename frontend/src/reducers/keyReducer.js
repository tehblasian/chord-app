import { INITIALIZE_KEYS_ARRAY, KEY_PRESSED, CLEAR_VOICING } from '../actions/actionTypes';
import analyzer from '../analyzer';

let initialState = {
    keys: [],
    selectedKeys: [],
    currentChord: null
}

const keyReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_KEYS_ARRAY: {
            return {
                ...state, keys: initializeKeys(action.payload.octaves, action.payload.start)
            }
        }
        case CLEAR_VOICING: {
            return {
                keys: state.keys.map(key => ({ ...key, isClicked: false })),
                selectedKeys: [],
                currentChord: null,
            }
        }
        case KEY_PRESSED: {
            const nextState = {
                ...state,
                keys: state.keys.map(key => {
                    if (key.id === action.payload) {
                        return {
                            ...key, isClicked: !key.isClicked
                        }
                    }
                    else {
                        return key;
                    }
                }),
            }

            return {
                ...nextState, 
                selectedKeys: nextState.keys
                                .filter(key => key.isClicked == true)
                                .map(key => key.id)
            }
        }    

        default: return state;    
    }
}

export default keyReducer;

const initializeKeys = (octaves, start) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const alt = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const keyboardWithSharps = [].concat(...Array(octaves).fill(notes));
    const keyboardWithFlats = [].concat(...Array(octaves).fill(alt));

    return keyboardWithSharps.map((key, index) => {
        // Each key will have its octave #
        const octaveNumber = Math.floor(index / 12);
        const keyObject = { id: key + (start + octaveNumber) };
        return {
            ...keyObject,
            alt: key.indexOf('#') > 0 ? keyObject.id.replace(/\w#/, keyboardWithFlats[index]) : null,
            isClicked: false,
        }
    })
}
