import express from 'express';
import { template } from './template';

// server port 
const PORT = process.env.PORT || 3000;

// start app
const app = express();

// app: host static files
app.use( '/static', express.static( 'public' ) );

// app: GET request
app.get( '/*', ( req, res ) => {

    // create response html 
    const indexHTML = template();

    // respond to client 
    res.end( indexHTML );
});

// app: listen to requets on port
app.listen( PORT, () => {
    console.log( `Server started on port ${PORT}.` );
})