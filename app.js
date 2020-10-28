const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use((req, res, next) => {
  req.user = {
    _id: '5f993d0955627e06b66cf080'
  };

  next();
});

app.use('/', users);
app.use('/', cards);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});



app.listen(PORT, () => {
  console.log(`server is Running on PORT ${PORT}`);
});
