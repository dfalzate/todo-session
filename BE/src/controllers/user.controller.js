const User = require('../models/user.model');

module.exports = {
   async signUp(req, res) {
      try {
         const data = req.body;
         const result = await User.create(data);
         res.status(200).send(result);
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async logIn(req, res) {
      try {
         const userReceived = req.body;
         const user = await User.findOne({ email: userReceived.email });
         if (user.password === userReceived.password) {
            res.status(200).send(req.session);
         } else {
            res.sendStatus(401);
         }
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async logOut(req, res) {
      try {
         req.session = null;
         res.sendStatus(200);
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
