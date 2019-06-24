const express = require('express');
const router = express.Router();
const map = new String('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

//Set REST API
router.get('/getHash', (req, res) => {
    var url = idToShortURL(12345);

    console.log(url);
    res.json(url);

});

router.get('/getId', (req, res) => {
    var id = reverseTinyURL('dnh');

    console.log(id);
    res.json(id);

});

// Get Tiny URL
router.post('/getTinyUrl', (req, res) => {
    const tinyId = 12345;
    const data = {
        id : tinyId,
        origAddress: req.body.address,
        newAddress: ""
    }
    console.log(data.id);
    console.log(data.origAddress);

    if (data.length == 0) {
        res.status(400).json({msg: 'Please include a URL address'});
    }
    else {
        data.newAddress = "http://localhost/dhs"
        console.log(data.origAddress);
        res.json(data);
    }
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
    // int id = 0;
    // for (int i = 0; i < tinyURL.length(); i++) {

    //     if ('a' <= tinyURL.charAt(i) && tinyURL.charAt(i) <= 'z')
    //         id = (id * 62) + tinyURL.charAt(i) - 'a';
    //     if ('A' <= tinyURL.charAt(i) && tinyURL.charAt(i) <= 'Z')
    //         id = (id * 62) + tinyURL.charAt(i) - 'Z';
    //     if ('0' <= tinyURL.charAt(i) && tinyURL.charAt(i) <= '9')
    //         id = (id * 62) + tinyURL.charAt(i) - '0';
    // }
    // return id;
}


module.exports = router;