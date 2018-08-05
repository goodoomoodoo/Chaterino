import React from 'react';
import firebase from 'firebase/app';
import 'firebase/app';
import CSSModules from 'react-css-modules';
import styles from '../style/ChatRoomMenu.css';
import { withRouter } from 'react-router-dom';

class ChatRoomMenu extends React.Component
{
    constructor( props )
    {
        super( props );

        this.handleDeleteRoom = this.handleDeleteRoom.bind( this );
    }

    handleDeleteRoom()
    {
        firebase.database().ref( 'rooms' ).child( this.props.roomId ).remove()
            .catch( err => {
                console.log( 'Delete Room Error firebase:rooms @ChatRoomMenu: ', err );
            });
        firebase.database().ref( 'users' ).child( this.props.user.uid ).child( 'memberOf' ).child( this.props.roomId ).remove()
            .catch( err => {
                console.log( 'Delete Room Error firebase:users @ChatRoomMenu: ', err );
            });

        this.props.history.push( '/' );
    }

    render()
    {
        return (
            <div styleName='container'>
                <ul>
                    <li>Settings</li>
                    <li onClick={ this.handleDeleteRoom }>Delete</li>
                </ul>
            </div>
        );
    }
}

export default withRouter( CSSModules( ChatRoomMenu, styles ) );