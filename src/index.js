import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import firebase from 'firebase';
import { firebase_config } from './firebase.config';

// initialize firebase app 
firebase.initializeApp( firebase_config );

ReactDOM.render( 
    <Router>
        <Route component={ App } />
    </Router>,
    document.getElementById( 'root' )
);