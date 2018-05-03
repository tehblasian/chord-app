var sharp11 = require('sharp11');
import teoria from 'teoria'

const getChord = (notes) => {
    var chords = sharp11.chord.getPossibleChordNamesFromArray(notes).map((name) => {
        if (name.indexOf('M') > 0)
            name = name.replace('M', 'Maj')
        
        return sharp11.chord.create(name);
    });

    console.log(chords[0].chord)
    return chords
}

export default {
    getChord
}
