import React from 'react';
import { connect } from 'react-redux';
import Octave from './Octave';
import { initializeKeysArray, keyPressed, clearVoicing } from '../actions/keyActions';

import { playNote, playVoicing } from '../util/AudioUtil';
@connect((store) => {
    return {
        selectedKeys: store.keys.selectedKeys,
    }
})
class ConnectedKeyboard extends React.Component {
    componentWillMount() {
        this.props.dispatch(initializeKeysArray(this.props.octaves, this.props.start));
    }
  
    onKeyPress = (event) => {
        const note = event.target.id;
        if (!this.props.selectedKeys.includes(note)) {
            playNote(note)
        }
        this.props.dispatch(keyPressed(note));
    }

    render() {
        const { octaves, selectedKeys } = this.props;
        return (
            <div className='keyboard'>
                <ul className='keyboard-layout'>
                    {
                        Array(octaves)
                            .fill()
                            .map((position, index) => { 
                                return <li key={index} className="octave">
                                            <Octave offset={index + this.props.start} 
                                                    selectedKeys={selectedKeys} 
                                                    onKeyPress={this.onKeyPress}/>
                                        </li> 
                                })
                    }
                </ul>
                <h1 className='header-small' style={{ display: 'inline', textAlign: 'left' }}>
                    {`Voicing: `}
                    {
                        selectedKeys.length > 0 
                        && selectedKeys
                        .reduce((key, acc) => {
                            return `${key} ${acc}`;
                        })
                    }
                </h1>
                <div style={{ display: 'inline-block', float: 'right' }}>
                    <button className="play-button" onClick={() => playVoicing(selectedKeys)}>Play</button>
                    <button className="clear-button" onClick={() => this.props.dispatch(clearVoicing())}>Clear</button>
                </div>
            </div>
        )
    }
}

export default ConnectedKeyboard;
