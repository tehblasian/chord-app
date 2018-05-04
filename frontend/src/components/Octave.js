import React from 'react';
import PianoKey from './PianoKey';

const Octave = (props) => {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    return (
        <React.Fragment>
            {
                notes.map(note => {
                    return <PianoKey 
                                key={note} 
                                note={note} 
                                offset={props.offset} 
                                selectedKeys={props.selectedKeys} 
                                onKeyPress={props.onKeyPress}/>
                })
            }
        </React.Fragment>
    )
}

export default Octave;
