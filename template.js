export const template = ( content = '' ) => (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="title" content="chaterino">
            <meta name="keywords" content="Firebase, Reactjs, Expressjs, Nodejs, Javascript">
            <meta name="author" content="Arvin Lin">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>chaterino</title>
            <link rel="stylesheet" type="text/css" href="static/style.css">
        </head>
        <body>
            <div id="root">${content}</div>
            <script src="static/bundle.js"></script>
        </body>
    </html>
`)