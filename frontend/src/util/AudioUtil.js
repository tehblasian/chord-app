import sharp11 from 'sharp11';
import audio from 'sharp11-web-audio'; 

export const playNote = note => {
    audio.init((err, fns) => {
        fns.play(note, -1, 3);
    });
}

export const playVoicing = notes => {
    const voicing = notes.map(note => sharp11.note.create(note));
    audio.init((err, fns) => {
        fns.play(voicing, -1, 3);
    });
}
