import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../style/Main.css';

class Main extends React.Component
{
    render()
    {
        return (
            <div styleName='container'>
                <div styleName='grid-container'>

                    <div styleName='grid-table'>
                        <ul styleName='table-container'>
                            <li>About</li>
                            <li>Get Started</li>
                            <li>Links</li>
                        </ul>
                    </div>

                    <div styleName='grid-content'>
                        <h1 styleName='title'>Chaterino</h1>
                        <h3 styleName='caption'>Consist of...</h3>
                        <ul styleName='links-container'>
                            <li><a href='https://cloud.google.com/appengine/'>Google App Engine</a></li>
                            <li><a href='https://firebase.google.com/'>Firebase</a></li>
                            <li><a href='https://reactjs.org'>React</a></li>
                            <li><a href='https://expressjs.com/'>Express</a></li>
                            <li><a href='https://webpack.js.org'>Webpack</a></li>
                            <li><a href='https://https://babeljs.io/'>Babel</a></li>
                            <li>etc...</li>
                        </ul>
                        <h1 styleName='title'>How does it work</h1>
                        <h3 styleName='caption'>If you just started...</h3>
                        <ul styleName='steps-container'>
                            <li>1. Click Create Room</li>
                            <li>2. Give it a name!</li>
                            <li>3. Click Create</li>
                            <li>4. Give your friends the Room ID so they can join!</li>
                        </ul>
                        <h3 styleName='caption'>If you have Room ID...</h3>
                        <ul styleName='steps-container'>
                            <li>1. Click Join Room </li>
                            <li>2. Enter the Room ID</li>
                            <li>3. TAADAAAA!</li>
                        </ul>
                    </div>

                </div>
            </div>
        )
    }
}

export default CSSModules( Main, styles );