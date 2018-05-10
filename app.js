const express = require('express');
const app = express();
const assert = require('assert');
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//pages
app.get('/', home);

//api
app.post('/api/login', login);


app.listen(3000, () => console.log('Example app listening on port 3000'));

function home(req, res) {
  res.sendFile(__dirname + '/pages/index.html');
}

function login(req, res) {
  console.log(req.body);
  res.send('yay'); //switch to res.redirect
}