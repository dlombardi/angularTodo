var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Task = new Schema({
  description: {type: String, required: true},
  dueDate: {type: Date, required: true},
  status: {type: Boolean, default: false}
});

module.exports = mongoose.model("Task", Task)
