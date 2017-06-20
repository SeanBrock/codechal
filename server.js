var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db =  mongojs('taskmanager', ['taskmanager']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/taskmanager', function (req, res){
  db.taskmanager.find(function(err,docs){
    res.json(docs);
  })
})

app.post('/taskmanager', function (req, res){
  db.taskmanager.insert(req.body, function (err, doc){
    res.json(doc);
  });
});

app.delete('/taskmanager/:id', function (req, res){
  var id = req.params.id;
  db.taskmanager.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);

  })
})
app.listen(3001);
console.log('listening on 3001')