const express = require('express');
const app = express();
const tinyUrl = require('./routes/api/tinyurl');
//const path = require('path');

app.use(express.json());

// Set the API tinyurl
app.use('/api/tinyurl', require('./routes/api/tinyurl'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

function handleRedirect(request, resp) {
    console.log('orig url:' + request.originalUrl);
    var redirectUrl = request.originalUrl.replace("/", "");
    // var id = tinyUrl.reverseTinyURL(redirectUrl);
    // console.log('id: ' + id);

    console.log('redirectUrl: ' + redirectUrl);
    resp.redirect('http://google.com');
}

app.get('*', handleRedirect);