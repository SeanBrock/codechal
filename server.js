var express = require('express');
var app = express();

app.get('/', function (req, res){
  console.log('getting!')
  res.send('this message appears in browser?!')
})

app.listen(3000);
console.log('listening on 3000')