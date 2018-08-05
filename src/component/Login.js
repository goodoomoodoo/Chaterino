import React from 'react';
import firebase from 'firebase';
import CSSModules from 'react-css-modules';
import styles from '../style/Login.css';
import Chaterino from '../logo/method-draw-image.svg';
import Google from '../logo/Google__G__Logo.svg';


class Login extends React.Component
{
   handleLogin()
    {
        firebase.auth().signInWithPopup( provider )
          .then( res => {
            const user = res.user;
            const dbRefUser = firebase.database().ref().child('users').child(user.uid);

            // creates a user in database if the user wasn't already existed
            dbRefUser.once( 'value', snap => {

                // if the user doesn't exist, create one
                if( !snap.exists() )
                {
                    dbRefUser.set({
                        username: user.displayName
                    })
                }
            });
          })
          .catch( err => {
              console.log( err );
          })
    }

    render()
    {
        return (
            <div styleName='container'>
                <svg dangerouslySetInnerHTML={{__html: Chaterino}} />
                <h2 styleName='title'>Welcome to chaterino</h2>
                <div styleName='btn grid-container google-btn' type='button' onClick={ this.handleLogin }> 
                    <div>
                        <svg styleName='logo' dangerouslySetInnerHTML={{__html: Google}} />
                    </div>
                    <div styleName='grid-context'>Sign in with Google</div>
                </div>
            </div>
        );
    }
}

const provider = new firebase.auth.GoogleAuthProvider();

export default CSSModules( Login, styles, { allowMultiple: true } );