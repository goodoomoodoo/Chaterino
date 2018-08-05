import React from 'react';
import firebase from 'firebase/app';
import 'firebase/app';
import CSSModules from 'react-css-modules';
import styles from '../style/JoinRoomForm.css';

class JoinRoomForm extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            roomId: '',
            message: ''
        }

        this.handleChange   = this.handleChange.bind( this );
        this.handleJoinRoom = this.handleJoinRoom.bind( this );
    }

    handleChange( e )
    {
        e.preventDefault();

        this.setState({
            roomId: e.target.value
        });
    }

    handleJoinRoom()
    {
        firebase.database().ref( 'rooms' ).child( this.state.roomId ).once( 'value', snap => {
            if( snap.exists() )
            {
                firebase
                    .database()
                    .ref( 'users' )
                    .child( this.props.user.uid )
                    .child( 'memberOf' )
                    .child( this.state.roomId )
                    .set({
                        roomId: this.state.roomId,
                        roomname: snap.val().roomname
                });

                this.props.redirect( this.state.roomId );
            }
            else
            {
                this.setState({
                    message: 'Room does not exist'
                });
            }
        });
    }

    render()
    {
        return (
            <div styleName='container'>

                <form styleName='input-container'>
                    <input type='text' name='roomId' placeholder='Room ID' value={ this.state.roomId } onChange={ this.handleChange } />
                    <div styleName='error-box'>{ this.state.message }</div>
                </form>

                <div styleName='btn-container'>
                    <div styleName='btn cancel' onClick={ this.props.cancel }>Cancel</div>
                    <div styleName='btn join' onClick={ this.handleJoinRoom }>Join</div>
                </div>

            </div>
        );
    }
}

export default CSSModules( JoinRoomForm, styles, { allowMultiple: true } );