import { INITIALIZE_KEYBOARD, KEY_PRESSED, CLEAR_VOICING } from './ActionTypes';

export const initializeKeyboard = (octaves, start, chord) => {
    return {
        type: INITIALIZE_KEYBOARD,
        payload: {
            octaves,
            start,
            chord,
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
