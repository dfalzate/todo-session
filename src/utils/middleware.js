const verify = (req, res, next) => {
   if (req.session.user) {
      console.log('True');
      next();
   } else {
      console.log('False');
      res.sendStatus(401);
   }
};

module.exports = verify;
