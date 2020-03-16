const mongoose = require('mongoose');

//const regex = new RegExp('RegExp expression');

const toDoSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
         //unique: true,
         //index: true,
         //minlength: ,
         //maxlength: ,
         //match: regex,
         //enum: ['opt1','opt2',...],
         //min: ,
         //max: ,
         //validate: [
         //{
         //validator: value => {
         //return regex.test(value);
         //},
         //message: 'Error message'
         //},
         //{}
         //]
      },
      description: {
         type: String,
         required: true
         //unique: true,
         //index: true,
         //minlength: ,
         //maxlength: ,
         //match: regex,
         //enum: ['opt1','opt2',...],
         //min: ,
         //max: ,
         //validate: [
         //{
         //validator: value => {
         //return regex.test(value);
         //},
         //message: 'Error message'
         //},
         //{}
         //]
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('ToDo', toDoSchema);
