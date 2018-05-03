import React from 'react';

const Octave = (props) => {
    const white = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const black = ['C#', 'D#', 'hidden', 'F#', 'G#', 'A#'];
    return (
        <div className='octave'>
            <ul className='white'>
                {
                    white.map((note) => {
                        let name = note + props.offset;
                        let selected = props.selectedKeys.indexOf(name) >= 0;
                        return <li key={name} 
                                   id={name} 
                                   className={selected ? 'selected-white' : ''} 
                                   onClick={props.onKeyPress}/>
                    })
                }
            </ul>
            <ul className='black'>
                {
                    black.map((note, index) => {
                        let name = note + props.offset;
                        let selected = props.selectedKeys.indexOf(name) >= 0;
                        if (index == 2) {
                            return <li key='hidden' className='hidden'/>
                        } 
                        return <li key={name} 
                                   id={name} 
                                   className={selected ? 'selected-black' : ''} 
                                   onClick={props.onKeyPress}/>
                    })
                }
            </ul>
        </div>
    )
}

export default Octave;
