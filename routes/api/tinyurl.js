const express = require('express');
const router = express.Router();
const DataAccess = require('../redis/myRedis');
const counter = require('../../mastercounter');
const map = new String('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

//Initialize redis
var da = new DataAccess("localhost", 6379);
// Increment the id immediately.
// I am not sure if this is guaranteed to make this id unique across many instances.
// @TODO Need to double check if this will not cause race condition across many instances.
da.incrementId();

//Set REST API
router.get('/getHash', (req, res) => {
    var url = idToShortURL(counter);
    console.log(url);
    res.json(url);
    da.incrementId();
});

// Get the Id.
router.get('/getId', (req, res) => {
    var id = reverseTinyURL('dnh');

    console.log(id);
    res.json(id);
    

});

// Get Tiny URL
router.post('/getTinyUrl', (req, res) => {

    const data = {
        id : counter.mycounter,
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
        res.json(data);
    }
    da.incrementId();
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
