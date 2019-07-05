const express = require('express');
const router = express.Router();
const DataAccess = require('../redis/myRedis');
// const counter = require('../../mastercounter');
const map = new String('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

// Make exports the same as module export
var exports = module.exports ={};

//Initialize redis
var da = new DataAccess("localhost", 6379);


//Set REST API
router.get('/getHash', (req, res) => {
    da.incrementId().then(function (result) {
        var url = idToShortURL(result);
        console.log('getHash: ' + url);
        res.json(url);
    });
});

// Get the Id. This is exposed to the outside world from this REST service
// I am not sure this is needed. I just want to show how to pass a parameter 
// to a GET REST svc.
router.get('/getId/:tinyUrl', (req, res) => {
    var tinyUrl = req.params.tinyUrl;
    console.log('getId params: ' + tinyUrl);
    var id = reverseTinyURL(tinyUrl);
    console.log(id);
    res.json(id);
});

// Get Tiny URL
router.post('/getTinyUrl', (req, res) => {
    da.incrementId().then(function(result) {
        const data = {
            id : result,
            origAddress: req.body.address,
            newAddress: ""
        }
        console.log(data.id);
        console.log(data.origAddress);
    
        if (data.length == 0) {
            res.status(400).json({msg: 'Please include a URL address'});
        }
        else {
            data.newAddress = "http://localhost/" + idToShortURL(data.id);
            console.log(data.origAddress);
            // Persist it in Redis
            da.setTinyUrl(data.id, data.origAddress);
            res.json(data);
        }
    });
});


function idToShortURL(id) {
    var tinyUrl = "";
    while (id > 1) {
        n = id%62;
        tinyUrl+=map.charAt(n);
        id = id / 62;
    }
    console.log(tinyUrl);
    return tinyUrl.split('').reverse().join('');
}

function reverseTinyURL(tinyUrl) {
    id = 0;
    for (i=0; i< tinyUrl.length; i++) {
        if ('a'.charCodeAt(0) <= tinyUrl.charCodeAt(i) && tinyUrl.charCodeAt(i) <= 'z'.charCodeAt(0)) {
            id = (id * 62) + tinyUrl.charCodeAt(i) - 'a'.charCodeAt(0);
        }
        if ('A'.charCodeAt(0) <= tinyUrl.charCodeAt(i) && tinyUrl.charCodeAt(i) <= 'Z'.charCodeAt(0)) {
            id = (id *62) + tinyUrl.charCodeAt(i) - 'Z'.charCodeAt(0);
        }
        if ('0'.charCodeAt(0) <= tinyUrl.charCodeAt(i) && tinyUrl.charCodeAt(i) <= '9'.charCodeAt(0)) {
            id = (id *62) + tinyUrl.charCodeAt(i) - '0'.charCodeAt(0);
        }
    }
    return id;

}


module.exports = router;
// exports = reverseTinyURL;
