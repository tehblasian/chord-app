import React from 'react';

const PianoKey = props => {
    const { note, offset, selectedKeys, onKeyPress } = props;
    const whiteKey = note + offset;
    let blackKey = (note === 'E' || note === 'B') ? null : (blackKey = note + '#' + offset);
    return (
        <div className="piano-key">
            <div 
                id={whiteKey} 
                className="white"
                style={selectedKeys.includes(whiteKey) ? { background: 'lime' } : {}} 
                onClick={onKeyPress}/>
            {
                blackKey 
                && <div 
                        id={blackKey}
                        className="black"
                        style={selectedKeys.includes(blackKey) ? { background: 'lime', boxShadow: '0px -3px 10px #00000057 inset' } : {}} 
                        onClick={onKeyPress}/>
            }
        </div>
    )
}

export default PianoKey;
