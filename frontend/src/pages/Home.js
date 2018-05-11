import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector, isValid, isDirty } from 'redux-form'
import ChordNameForm from '../components/ChordNameForm';
import ConnectedKeyboard from'../components/ConnectedKeyboard';
import { updateChordName } from '../actions/KeyActions';

const mapStateToProps = store => ({
    chordName: formValueSelector('chordName')(store, 'chordName'),
    chordNameIsValid: isValid('chordName')(store) && isDirty('chordName')(store),
});
const mapDispatchToProps = dispatch => ({ updateChordName: chord => dispatch(updateChordName(chord)) });

@connect(mapStateToProps, mapDispatchToProps)
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps = nextProps => {
        const { chordName, chordNameIsValid, updateChordName } = nextProps;
        if (chordNameIsValid) {
            updateChordName(chordName);
        }
        return null;
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        const { chordName, chordNameIsValid } = this.props;
        return (
            <div className='home-container'>
                <h1 className='header'>Create a voicing</h1>
                <ChordNameForm handleChange={this.updateChordName} handleSubmit={this.handleSubmit}/>
                <ConnectedKeyboard 
                    octaves={3} 
                    start={3} 
                    chordName={chordName}
                    enabled={chordNameIsValid}/>
            </div>
        )
    }
}
