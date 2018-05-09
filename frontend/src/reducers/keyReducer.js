import { INITIALIZE_KEYBOARD, UPDATE_CHORD, KEY_PRESSED, CLEAR_VOICING } from '../actions/ActionTypes';
import {  getChordRoot, getChordQuality, getChordExtension } from '../util/ChordUtil';

let initialState = {
    chord: {
        name: '',
        root: '',
        quality: '',
    },
    keys: [],
    selectedKeys: {
        names: [],
        extensions: [],
    },
}

const KeyReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_KEYBOARD: {
            return {
                ...state,
                keys: initializeKeys(action.payload.octaves, action.payload.start)
            }
        }
        case UPDATE_CHORD: {
            return {
                ...state, 
                chord: {
                    name: action.payload,
                    root: getChordRoot(action.payload),
                    quality: getChordQuality(action.payload),
                }
            }
        } 
        case CLEAR_VOICING: {
            return {
                ...state,
                keys: state.keys.map(key => ({ ...key, isClicked: false })),
                selectedKeys: {
                    names: [],
                    extensions: [],
                }
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

            const selectedKeyNames = nextState.keys
                .filter(key => key.isClicked == true)
                .map(key => key.id);

            return {
                ...nextState, 
                selectedKeys: {
                    names: selectedKeyNames,
                    extensions: selectedKeyNames
                                    .map(key => getChordExtension(nextState.chord.root, nextState.chord.quality, key)),
                }
            }
        }    

        default: return state;    
    }
}

export default KeyReducer;

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
