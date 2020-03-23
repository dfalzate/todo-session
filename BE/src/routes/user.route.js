const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.route('/signup').post(userController.signUp);
router.route('/login').post(userController.logIn);
router.route('/logout').get(userController.logOut);

module.exports = router;
