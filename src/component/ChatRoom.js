import React from 'react';
import firebase from 'firebase';
import Menuicon from '../logo/menu-icon.svg';
import CSSModules from 'react-css-modules';
import styles from '../style/ChatRoom.css';
import ChatRoomMenu from './ChatRoomMenu';

class ChatRoom extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            messageOut: '',
            messageDisplay: [],
            dbRefRoom: undefined,
            currRoom: undefined,
            menuState: false
        }
        
        this.handleSwitchMenu    = this.handleSwitchMenu.bind( this );
        this.handleMessageChange = this.handleMessageChange.bind( this );
        this.handleInput         = this.handleInput.bind( this );
    }

    componentWillMount()
    {   
        const dbRefRoom = firebase.database().ref( 'rooms' ).child( this.props.match.params.id );
        
        dbRefRoom.once( 'value', snap => {
            if( !snap.exists() )
            {
                // if room doesn't exist return to home page
                this.props.history.push( '/' );
            }
        });

        this.setState({
            dbRefRoom: dbRefRoom
        });
    }

    componentDidMount()
    {
        // Initialize currRoom
        this.state.dbRefRoom
            .on( 'value', snap => {
                if( snap.exists() )
                {   
                    const currRoom = snap.val();
                    const messageArr = [];

                    for( let n in currRoom.messages )
                    {
                        messageArr.push( currRoom.messages[ n ] );
                    }

                    this.setState({
                        currRoom: currRoom,
                        messageDisplay: messageArr
                    });
                }
            });
    }

    componentDidUpdate( prevProps )
    {
        // this condition prevents infinity loop and memory leak
        if( this.props.match.params.id !== prevProps.match.params.id )
        {
            firebase
                .database()
                .ref( 'rooms' )
                .child( this.props.match.params.id )
                .on( 'value', snap => {
                    if( snap.exists() )
                    {   
                        const currRoom = snap.val();
                        const messageArr = [];

                        for( let n in currRoom.messages )
                        {
                            messageArr.push( currRoom.messages[ n ] );
                        }

                        this.setState({
                            currRoom: currRoom,
                            messageDisplay: messageArr
                        });
                    }
                });
        }
    }

    handleSwitchMenu()
    {
        this.setState({
            menuState: !this.state.menuState
        });
    }

    handleMessageChange( e )
    {
        e.preventDefault();

        this.setState({
            messageOut: e.target.value
        });
    }

    handleInput( e )
    {
        if( e.key === 'Enter' )
        {
            e.preventDefault();

            if( e.target.value !== '' )
            {
                firebase.database().ref( 'rooms' ).child( this.props.match.params.id ).child( 'messages' ).push({
                    author: this.props.user.displayName,
                    content: e.target.value
                });

                this.setState({
                    messageOut: ''
                });
            }
        }
    }

    render()
    {
        return (
            <div styleName='grid-container'>

                <div styleName='grid-bar'>
                    {
                        this.state.currRoom === undefined
                        ||
                        <div styleName='roomname'>{ `${this.state.currRoom.roomname}:${this.props.match.params.id}` }</div>
                    }
                    <svg styleName='icon' onClick={ this.handleSwitchMenu } dangerouslySetInnerHTML={{__html: Menuicon}} />
                    {
                        this.state.menuState
                        &&
                        <ChatRoomMenu user={ this.props.user } roomId={ this.props.match.params.id } />
                    }
                </div>

                <div styleName='grid-chatbox'>
                    <ul styleName='chatbox-container'>
                        {
                            this.state.messageDisplay.map( ( message, index ) => (
                                <li key={index}>
                                    <div styleName='username'>{message.author}</div>
                                    <div styleName='chatmessage'>{message.content}</div>
                                </li>
                            ))
                        }    
                    </ul>
                </div>

                <div styleName='grid-input'>
                    <form autoComplete='off' styleName='input-container'>
                        <div styleName='input-header'>></div>
                        <input styleName='input-box' type='text' name='message' value={ this.state.messageOut } onKeyDown={ this.handleInput }
                             onChange={ this.handleMessageChange } />
                    </form>
                </div>
            </div>
        );
    }
}

export default CSSModules( ChatRoom, styles );