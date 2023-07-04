const express = require('express');
const db = require('./database/database');
const router = require('./router/router');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())



app.use('/api', router)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
