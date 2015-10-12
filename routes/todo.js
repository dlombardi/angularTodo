var express = require('express');
var router = express.Router();
var Task = require("../models/task");

/* GET home page. */
router.get('/', function(req, res, next) {
  Task.find({}, function(err, tasks){
    res.send(tasks);
  });
});

router.post('/add', function(req, res, next){
  var task = new Task(req.body);
    task.save(function(err, task){
      res.send(task);
    })
  });

router.put('/update', function(req,res,next){
  Task.findById(req.body._id, function(err, task){
    task.status = !task.status;
    console.log(task);
    task.save(function(err, task){
      res.send(task);
    });
  });
});

router.delete('/:id', function(req, res, next){
  Task.findByIdAndRemove(req.params.id, function(err, task){
    res.send(task);
  });
})

module.exports = router;
