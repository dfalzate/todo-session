const mongoose = require('mongoose');

//const regex = new RegExp('RegExp expression');

const toDoSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      },
      description: {
         type: String,
         required: true
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('toDo', toDoSchema);
