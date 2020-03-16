require('dotenv').config();
const express = require('express');
const connection = require('./db');
var cors = require('cors');
const cookieSession = require('cookie-session');
const User = require('./models/user.model');
const toDo = require('./models/toDo.model');
const app = express();

app.use(cors());
app.use(express.json());
app.use(
   cookieSession({
      secret: process.env.SECRET,
      maxAge: 1000 * 60 * 60 * 1000 * 24
   })
);

app.post('/signup', (req, res) => {
   const data = req.body;
   User.create(data).then(user => {
      res.status(200).send(user);
   });
});

app.get('/login/:id', (req, res) => {
   const id = req.params.id;
   const password = req.query.pass;
   User.findById(id).then(user => {
      if (user.password === password) {
         req.session.user = user;
         res.status(200).send(req.session);
      } else {
         res.sendStatus(401);
      }
   });
});

app.get('/logout', (req, res) => {
   req.session = null;
   res.sendStatus(200);
});

const verify = (req, res, next) => {
   if (req.session.user) {
      console.log('True');
      next();
   } else {
      console.log('False');
      res.sendStatus(401);
   }
};

app.get('/toDo', verify, (req, res) => {
   toDo.find().then(toDos => {
      res.status(200).send(toDos);
   });
});

app.post('/toDo', verify, (req, res) => {
   const data = req.body;
   toDo.create(data).then(toDo => res.status(200).send(toDo));
});

const port = 3000;

app.listen(port, () => {
   console.log(`Server started on port http://localhost:${port}`);
});
