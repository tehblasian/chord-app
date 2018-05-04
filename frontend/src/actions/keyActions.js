import { INITIALIZE_KEYS_ARRAY, KEY_PRESSED, CLEAR_VOICING } from './actionTypes';

export const initializeKeysArray = (octaves, start) => {
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

export const clearVoicing = () => {
    return {
        type: CLEAR_VOICING,
    }
}
