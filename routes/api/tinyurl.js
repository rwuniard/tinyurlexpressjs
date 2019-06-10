const express = require('express');
const router = express.Router();

//Set REST API
router.get('/', (req, res) => {
    console.log("get rest api");
    res.json('{msg: "true"}');

})

module.exports = router;