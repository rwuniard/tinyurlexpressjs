const express = require('express');
const router = express.Router();
const map = new String('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

//Set REST API
router.get('/', (req, res) => {
    var url = idToShortURL(12345);

    console.log(url);
    res.json(url);

})

function idToShortURL(id) {
    var tinyUrl = "";
    while (id > 1) {
        n = id%62;
        tinyUrl+=map.charAt(n);
        id = id / 62;
    }
    console.log(tinyUrl);
    return tinyUrl.split('').reverse().join();

}


module.exports = router;