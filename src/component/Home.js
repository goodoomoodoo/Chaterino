import React from 'react';
import firebase from 'firebase/app';

// Router
import { Switch, withRouter, Route } from 'react-router-dom';

// Components 
import Main from './Main';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import DisplayUser from './DisplayUser';
import ChatRoom from './ChatRoom';

// Logo
import Chaterino from '../logo/method-draw-image.svg';

// Mount css
import CSSModules from 'react-css-modules';
import styles from '../style/Home.css';

class Home extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            dbRefRoom: undefined,
            rooms: [],
            currUser: undefined
        }

        this.handleCommand  = this.handleCommand.bind( this );
        this.handleOpenRoom = this.handleOpenRoom.bind( this );
        this.redirectToHome = this.redirectToHome.bind( this );
        this.redirectToRoom = this.redirectToRoom.bind( this );
    }

    componentDidMount()
    {
        const currUser =  firebase.auth().currentUser;
        const userId = currUser.uid;
        const dbRefRoom = firebase.database().ref( 'rooms' );
        const dbRefPointers = firebase.database().ref( 'users' ).child( userId).child( 'memberOf' );

        this.setState({
            currUser: currUser,
            dbRefRoom: dbRefRoom
        });
        
        // Initialize the user room list from firebase
        dbRefPointers.on( 'value', snap => {
            const pointers = snap.val();
            let arr = [];


            if( pointers )
                for( let n in pointers )
                {
                    arr.push( pointers[ n ] );
                    console.log( pointers[ n ] );
                }

            this.setState({
                rooms: arr
            });
        });
    }

    handleSignOut()
    {
        firebase.auth().signOut();
    }

    handleCommand( e )
    {
        this.props.history.push( `/${e.target.id}` );
    }

    handleOpenRoom( e )
    {
        this.props.history.push( `/${e.target.id}` );
    }

    redirectToHome()
    {
        this.props.history.push( '/' );
    }

    redirectToRoom( roomId )
    {
        this.props.history.push( `/${roomId}`);
    }

    render()
    {         
        return (
            <div styleName='container'>

                <div styleName='grid-container'>

                    <div styleName='grid-header'>
                        <div styleName='logo-container'>
                            <svg styleName='logo' dangerouslySetInnerHTML={{__html: Chaterino}} />
                            <div styleName='logo-title'>Chaterino</div>
                            {
                                this.state.currUser === undefined
                                ||
                                <DisplayUser currUser={ this.state.currUser } />
                            }
                        </div>
                    </div>
                    
                    <div styleName='grid-commands'>
                        <ul>
                            <li id='create' styleName='btn' onClick={ this.handleCommand }>Create room</li>
                            <li id='join' styleName='btn' onClick={ this.handleCommand }>Join room</li>
                        </ul>
                    </div>
                
                    <div styleName='grid-main'>
                        
                        <Switch>
                            <Route exact path='/' component={ Main } /> 

                            <Route path='/create' render={ props => 
                                (<CreateRoomForm {...props} user={ this.state.currUser } cancel={ this.redirectToHome } redirect={ this.redirectToRoom }/>)} />

                            <Route path='/join' render={ props => 
                                (<JoinRoomForm {...props} user={ this.state.currUser } cancel={ this.redirectToHome } redirect={ this.redirectToRoom }/>)} />

                            <Route path='/:id' render={ props => (<ChatRoom {...props} history={ this.props.history } user={ this.state.currUser } />)} />

                        </Switch>
                    </div>

                    <div styleName='grid-rooms'>
                        <ul styleName='rooms-container'>
                            <h3>My rooms</h3>
                            {
                                this.state.rooms.map( ( room, index ) => (
                                    <li id={ room.roomId } key={ index } onClick={ this.handleOpenRoom }>{ room.roomname }</li>
                                ))
                            }
                        </ul>
                    </div>

                    <div styleName='grid-util'>
                        <ul>
                            <li styleName='btn' onClick={ this.handleSignOut }>Sign Out</li>
                        </ul>
                        <div styleName='tag'>Beta v0.1.0</div>
                        <div styleName='tag'>Repo: <a href='https://github.com/goodoomoodoo'>My Github</a></div>
                    </div>

                </div>

            </div>
        )
    }
}

export default withRouter( CSSModules( Home, styles, { allowMultiple: true } ) );