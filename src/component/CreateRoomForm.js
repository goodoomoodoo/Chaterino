import React from 'react';
import uniqid from 'uniqid';
import firebase from 'firebase';
import CSSModules from 'react-css-modules';
import styles from '../style/CreateRoomForm.css';

class CreateRoomForm extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            roomId: undefined,
            roomname: ''
        };

        this.handleInput      = this.handleInput.bind( this );
        this.handleCreateRoom = this.handleCreateRoom.bind( this );
    }

    componentDidMount()
    {
        const roomId = uniqid();

        this.setState({
            roomId: roomId
        });
    }

    handleInput( e )
    {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleCreateRoom()
    {
        createRoom( this.props.user.displayName , this.state.roomname, this.state.roomId );

        this.props.cancel();

        // add this room to user
        const userId = this.props.user.uid;

        firebase.database()
          .ref( 'users' )
          .child( userId )
          .child( 'memberOf' )
          .child( this.state.roomId )
          .set({
              roomId: this.state.roomId,
              roomname: this.state.roomname
          })
          .then( success => {
              this.props.redirect( this.state.roomId );
          });
    }

    render()
    {
        return (
            <div styleName='grid-container'>
                
                <div styleName='grid-title'>
                    Room Name
                </div>
                <div styleName='grid-content'>
                    <input type='text' name='roomname' value={ this.state.roomname } onChange={ this.handleInput } />
                </div>

                <div styleName='grid-title'>
                    Room ID
                </div>
                <div styleName='grid-content'>
                    <div>{ this.state.roomId }</div>
                </div>

                <div styleName='grid-title'>
                    Owner
                </div>
                <div styleName='grid-content'>
                    <div>{ this.props.user && this.props.user.displayName }</div>
                </div>

                <div styleName='btn-container'>
                    <div styleName='btn cancel' onClick={ this.props.cancel }>Cancel</div>
                    <div styleName='btn create' onClick={ this.handleCreateRoom }>Create</div>
                </div>
            </div>
        );
    }
}

const createRoom = ( username, roomname, roomId ) => 
{
    if( roomname === '' )
    {
        roomname = 'I love chatting';
    }

    const dbRefRoom = firebase
                        .database()
                        .ref()
                        .child( 'rooms' )
                        .child( roomId );

    dbRefRoom.set({
        owner: username,
        roomname: roomname,
        roomId: roomId,
        messages: {
            0: {
                author: 'admin',
                content: 'Welcome to the chat room'
            }
        }
    });
}

export default CSSModules( CreateRoomForm, styles, { allowMultiple: true } );