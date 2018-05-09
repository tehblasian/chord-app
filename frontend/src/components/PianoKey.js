import React from 'react';

const PianoKey = props => {
    const { note, offset, selectedKeys, onKeyPress, enabled } = props;
    const whiteKey = note + offset;
    let blackKey = (note === 'E' || note === 'B') ? null : (blackKey = note + '#' + offset);
    return (
        <div className="piano-key">
            <div 
                id={whiteKey} 
                className={enabled ? 'white' : 'white-disabled'}
                style={selectedKeys.includes(whiteKey) ? { background: 'lime' } : {}} 
                onClick={enabled ? onKeyPress : null}/>
            {
                blackKey 
                && <div 
                        id={blackKey}
                        className={enabled ? 'black' : 'black-disabled'}
                        style={selectedKeys.includes(blackKey) ? { background: 'lime', boxShadow: '0px -3px 10px #00000057 inset' } : {}} 
                        onClick={enabled ? onKeyPress : null}/>
            }
        </div>
    )
}

export default PianoKey;
