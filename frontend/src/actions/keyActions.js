import { INITIALIZE_KEYS_ARRAY, KEY_PRESSED } from './actionTypes';

export const populateKeysArray = (octaves, start) => {
    return {
        type: INITIALIZE_KEYS_ARRAY,
        payload: {
            octaves,
            start
        },
    }
}

export const keyPressed = (id) => {
    return {
        type: KEY_PRESSED,
        payload: id,
    }
}
