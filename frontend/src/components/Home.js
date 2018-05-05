import React from 'react';
import ConnectedKeyboard from'./ConnectedKeyboard';
export default class Home extends React.Component{
    render() {
        return (
            <div className='home-container'>
                <h1 className='header'>Create a voicing</h1>
                <ConnectedKeyboard octaves={3} start={3}/>
            </div>
        )
    }
}
