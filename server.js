var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db =  mongojs('taskmanager', ['taskmanager']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/taskmanager', function (req, res){
  // console.log('get post recieved')
  // noun1 = {thing: 'dog'}
  // noun2 = {thing: 'cat'}
  // noun3 = {thing: 'bird'}
  // var nounlist = [noun1,noun2,noun3];
  // res.json(nounlist)
  db.taskmanager.find(function(err,docs){
    console.log(docs);
    res.json(docs);
  })
})

app.post('/taskmanager', function (req, res){
  db.taskmanager.insert(req.body, function (err, doc){
    res.json(doc);
  });
});

app.delete('/taskmanager/:id', function (req, res){
  //db.nounlist.delete()
  var id = req.params.id;
  console.log(id)
  db.nounlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);

  })
})
app.listen(3001);
console.log('listening on 3001')