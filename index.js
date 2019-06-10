const express = require('express');
const app = express();
//const path = require('path');


// Set the API tinyurl
app.use('/api/tinyurl', require('./routes/api/tinyurl'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

