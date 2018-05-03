import React from 'react';
import { connect } from 'react-redux';
import Octave from './Octave';
import { populateKeysArray, keyPressed } from '../actions/keyActions';

@connect((store) => {
    return {
        selectedKeys: store.keys.selectedKeys,
    }
})
class ConnectedKeyboard extends React.Component {
    componentWillMount() {
        this.props.dispatch(populateKeysArray(this.props.octaves, this.props.start));
    }
  
    onKeyPress = (event) => {
        this.props.dispatch(keyPressed(event.target.id));
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
                                return <li key={index}>
                                            <Octave offset={index + this.props.start} 
                                                    selectedKeys={selectedKeys} 
                                                    onKeyPress={this.onKeyPress}/>
                                        </li> 
                                })
                    }
                </ul>
                <h1 className='header-small' style={{ textAlign: 'left' }}>
                    {`Voicing: `}
                    {
                        selectedKeys.length > 0 
                        && selectedKeys
                        .reduce((key, acc) => {
                            return `${key} ${acc}`;
                        })
                    }
                </h1>
            </div>
        )
    }
}

export default ConnectedKeyboard;
