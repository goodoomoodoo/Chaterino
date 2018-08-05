import React from 'react';
import styles from '../style/DisplayUser.css';
import CSSModules from 'react-css-modules';

class DisplayUser extends React.Component
{
    render()
    {
        return (
            <div styleName='container'>
                <img styleName='userphoto' src={ this.props.currUser.photoURL } />
                <div styleName='useremail'>{ this.props.currUser.email }</div>
            </div>
        );
    }
}

export default CSSModules( DisplayUser, styles );