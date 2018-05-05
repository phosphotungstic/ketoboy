const express = require('express');
const app = express();
const assert = require('assert');

app.get('/', home);
app.listen(3000, () => console.log('Example app listening on port 3000'));

function home(req, res) {
  res.send('hello');
}
