import React from 'react';
import firebase from 'firebase';
import Login from './component/Login';
import Home from './component/Home';

class App extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            isMount: false,
            user: undefined,
            isAuthorized: false
        }
    }

    componentDidMount()
    {
        firebase.auth().onAuthStateChanged( user => {
            if( user )
            {
                this.setState({
                    user: user,
                    isAuthorized: true
                });
            }
            else
            {
                this.setState({
                    user: undefined,
                    isAuthorized: false
                })
            }

            this.setState({
                isMount: true
            });
        })
    }

    render()
    {
        return (
            <div>
                {
                    !this.state.isMount
                    ||
                    this.state.isAuthorized
                    ||
                    <Login />
                }
                {
                    this.state.isAuthorized
                    &&
                    <Home />
                }
            </div>
        );
    }
}

export default App;