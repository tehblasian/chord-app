import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { AutoComplete as MUIAutoComplete } from 'material-ui';
import { AutoComplete } from 'redux-form-material-ui';
import { MuiThemeProvider }from 'material-ui/styles';
import { validateChordName, getAllChordNames } from '../util/ChordUtil';

const validate = values => {
    const errors = {};
    if (!validateChordName(values.chordName)) {
        errors.chordName = 'Invalid chord name!';
    }
    return errors;
}

class ChordNameForm extends React.Component{
    componentDidMount() {
        this.AutoComplete
            .getRenderedComponent()
            .getRenderedComponent()
            .focus();
    }

    render() {    
        const { handleChange, handleSubmit } = this.props;
        return (
            <MuiThemeProvider>
                <form onSubmit={handleSubmit} style={{height: '95px'}}>
                    <Field
                        name="chordName" 
                        component={AutoComplete} 
                        dataSource={getAllChordNames()}
                        maxSearchResults={7}
                        floatingLabelText="Chord"
                        floatingLabelFixed={true}
                        floatingLabelShrinkStyle={{ color: 'black', fontWeight: 100, fontSize: '38px', top: '25px' }}
                        hintText="i.e. C7b9#11"
                        underlineFocusStyle={{ borderColor: 'lime' }}
                        normalize={value => value ? value[0].toUpperCase() + value.slice(1) : ''}
                        withRef ref={ref => this.AutoComplete = ref}/>
                </form>
            </MuiThemeProvider>
        )
    }
}

ChordNameForm = reduxForm({
    form: 'chordName',
    validate,
})(ChordNameForm);

export default ChordNameForm;
