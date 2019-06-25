const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser
app.use(bodyParser.json());

// Route
app.use('/', require('./routes/index'));

// MongoDB
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected sucessfully'))
    .catch(error => console.log(error));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}...`))