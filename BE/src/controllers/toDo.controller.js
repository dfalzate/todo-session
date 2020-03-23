const toDo = require('../models/toDo.model');

module.exports = {
   async find(req, res) {
      try {
         const result = await toDo.find();
         res.status(200).send(result);
      } catch (error) {
         res.status(404).send(error);
      }
   },
   async findById(req, res) {
      try {
         const id = req.params.id;
         const result = await toDo.findById(id);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async create(req, res) {
      try {
         const body = req.body;
         const result = await toDo.create(body);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findByIdAndUpdate(req, res) {
      try {
         const id = req.params.id;
         const body = req.body;
         const result = await toDo.findByIdAndUpdate(id, body, {
            useFindAndModify: false
         });
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async findByIdAndDelete(req, res) {
      try {
         const id = req.params.id;
         const result = await toDo.findByIdAndDelete(id);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
