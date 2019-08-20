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
    var origUrl = request.originalUrl.replace("/", "");

    var id = tinyUrl.reverseTinyURL(origUrl);
    console.log('id: ' + id);
    console.log('redirectUrl: ' + origUrl);
    tinyUrl.getRealAddr(id).then( function(result) {
        var destUrl = result;
        console.log('destUrl: ' + destUrl);
        resp.redirect(destUrl);
    });
    
   
}

//I need to fix this handle. This doesn't seem to be correct, but no idea what's the correct one.
app.get('*', handleRedirect);

// NOTES:
// Run Redis locally, through kinematic is the easiest.
// docker exec -it redis1 sh -> This will connect through Shell to Redis instance named Redis1
// Set the masterCounter to 1000 -> SET masterCounter 1000
// TO use this, please go to Postman.
// Post : http://localhost:5000/api/tinyUrl/getTinyUrl
// in the body
// {
//	"address": "http://cnn.com"
// }