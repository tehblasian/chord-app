import React from 'react';
import { connect } from 'react-redux';
import Octave from './Octave';
import { initializeKeyboard, keyPressed, clearVoicing } from '../actions/KeyActions';

import { playNote, playVoicing } from '../util/AudioUtil';
import { getChordExtension } from '../util/ChordUtil';

@connect((store) => {
    return {
        selectedKeys: store.keyboard.selectedKeys,
    }
})
class ConnectedKeyboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chord: {
                name: 'C7b7#11',
                root: 'C',
                quality: 'half-diminished',
            }
        }    
    }

    componentWillMount() {
        this.props.dispatch(initializeKeyboard(this.props.octaves, this.props.start, this.state.chord));
    }
  
    onKeyPress = (event) => {
        const note = event.target.id;
        if (!this.props.selectedKeys.names.includes(note)) {
            playNote(note)
        }
        this.props.dispatch(keyPressed(note));
    }

    render() {
        const { octaves, selectedKeys} = this.props;
        return (
            <div className='keyboard'>
                <ul className='keyboard-layout'>
                    {
                        Array(octaves)
                            .fill()
                            .map((position, index) => { 
                                return <li key={index} className="octave">
                                            <Octave offset={index + this.props.start} 
                                                    selectedKeys={selectedKeys.names} 
                                                    onKeyPress={this.onKeyPress}/>
                                        </li> 
                                })
                    }
                </ul>
                <h1 className='header-small' style={{ display: 'inline', textAlign: 'left' }}>
                    {`Voicing: `}
                    {
                        selectedKeys.extensions.length > 0 
                        && selectedKeys.extensions
                            .reduce((key, acc) => {
                                return `${key} ${acc}`;
                            })
                    }
                </h1>
                <div style={{ display: 'inline-block', float: 'right' }}>
                    <button className="play-button" onClick={() => playVoicing(selectedKeys.names)}>Play</button>
                    <button className="clear-button" onClick={() => this.props.dispatch(clearVoicing())}>Clear</button>
                </div>
            </div>
        )
    }
}

export default ConnectedKeyboard;
