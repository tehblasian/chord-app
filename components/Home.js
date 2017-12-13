import React from 'react';
import { connect } from 'react-redux';
import keyActions from '../actions/keyActions';

@connect((store) => {
    return {
        keys: store.keys.keys,
        selectedKeys: store.keys.selectedKeys,
        octaves: store.keys.octaves,
        currentChord: store.keys.currentChord
    }
})
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(keyActions.populateKeysArray());
    }
    handleClick(event){
        this.props.dispatch(keyActions.keyPressed(event.target.id));
    }
    render() {
        return (
            <div className='home-container'>
                <h1 className='header'>Chord Voicings</h1>
                <table style={{margin: 'auto'}}>
                    <tbody>
                        <tr>
                            <td><Keyboard octaves={this.props.octaves} selectedKeys={this.props.selectedKeys} onKeyPress={this.handleClick} /></td>
                        </tr>
                        <tr>
                            <td>
                                <h1 className='header-small' style={{ textAlign: 'left' }}>
                                    Voicing: {this.props.selectedKeys.length > 0 && this.props.selectedKeys
                                        .reduce((key, acc) => {
                                            return key + ' ' + acc;
                                        })}
                                </h1>
                            </td>
                        </tr>
                    </tbody>
                </table>        
            </div>
        )
    }
}

const Keyboard = (props) => {
    return (
        <div className='keyboard'>
            <ul className='keyboard-layout'>
                {
                    Array(props.octaves)
                        .fill()
                        .map((position, index) => { return <li key={index}><Octave offset={index + 3} selectedKeys={props.selectedKeys} onKeyPress={props.onKeyPress}/></li> })
                }
            </ul>
        </div>
    )
}

const Octave = (props) => {
    const white = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const black = ['C#', 'D#', 'hidden', 'F#', 'G#', 'A#'];
    return (
        <div className='octave'>
            <ul className='white'>
                {
                    white.map((note) => {
                        var name = note + props.offset;
                        var selected = props.selectedKeys.indexOf(name) >= 0;
                        return <li key={name} id={name} className={selected? 'selected-white' : ''} onClick={props.onKeyPress}></li>
                    })
                }
            </ul>
            <ul className='black'>
                {
                    black.map((note, index) => {
                        var name = note + props.offset;
                        var selected = props.selectedKeys.indexOf(name) >= 0;
                        if (index == 2) return <li key='hidden' className='hidden'></li>
                        return <li key={name} id={name} className={selected ? 'selected-black' : ''} onClick={props.onKeyPress}></li>
                    })
                }
            </ul>
        </div>
    )
}