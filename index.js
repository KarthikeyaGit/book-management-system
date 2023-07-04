const express = require('express');
const router = require('./router/router');
var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use('/api', router)

app.use(express.static(path.join(__dirname, 'admin', 'dist')));
app.get('*/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'admin', 'dist', 'index.html'));
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
