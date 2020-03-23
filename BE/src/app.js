const mongoose = require('./db');
const cors = require('cors');
const express = require('express');
const userRoute = require('./routes/user.route');
const toDoRoute = require('./routes/toDo.route');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRoute);
app.use('/toDos', toDoRoute);

module.exports = { app, mongoose };
