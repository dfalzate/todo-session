const router = require('express').Router();
const toDOController = require('../controllers/toDo.controller');

router.route('/').get(toDOController.find);
router.route('/:id').get(toDOController.findById);
router.route('/').post(toDOController.create);
router.route('/:id').put(toDOController.findByIdAndUpdate);
router.route('/:id').delete(toDOController.findByIdAndDelete);

module.exports = router;
