import { INITIALIZE_KEYS_ARRAY, KEY_PRESSED } from './actionTypes';

const populateKeysArray = () => {
    return {
        type: INITIALIZE_KEYS_ARRAY
    }
}


const keyPressed = (id) => {
    return {
        type: KEY_PRESSED,
        payload: id
    }
}

export default {
    populateKeysArray,
    keyPressed
}
