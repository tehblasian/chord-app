import React from 'react';
import { connect } from 'react-redux';
import Octave from './Octave';
import { initializeKeyboard, keyPressed, clearVoicing } from '../actions/KeyActions';

import { playNote, playVoicing } from '../util/AudioUtil';
import { getChordRoot, getChordQuality, getChordExtension } from '../util/ChordUtil';

const mapStateToProps = store => ({ selectedKeys: store.keyboard.selectedKeys });
const mapDispatchToProps = dispatch => ({
    initializeKeyboard: (octaves, start, chord) => dispatch(initializeKeyboard(octaves, start, chord)),
    keyPressed: key => dispatch(keyPressed(key)),
    clearVoicing: () => dispatch(clearVoicing()),
});

@connect(mapStateToProps, mapDispatchToProps, null, { withRef: true})
class ConnectedKeyboard extends React.Component {
    componentWillMount() {
        this.props.initializeKeyboard(this.props.octaves, this.props.start);
    }
  
    onKeyPress = (event) => {
        const key = event.target.id;
        if (!this.props.selectedKeys.names.includes(key)) {
            playNote(key);
        }
        this.props.keyPressed(key);
    }

    render() {
        const { octaves, selectedKeys, enabled } = this.props;
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
                                                    onKeyPress={this.onKeyPress}
                                                    enabled={enabled}/>
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
                    <button 
                        className="play-button"
                        onClick={() => playVoicing(selectedKeys.names)} 
                        disabled={!enabled}>
                            Play
                    </button>
                    <button 
                        className="clear-button" 
                        onClick={this.props.clearVoicing} 
                        disabled={!enabled}>
                            Clear
                    </button>
                </div>
            </div>
        )
    }
}

export default ConnectedKeyboard;
