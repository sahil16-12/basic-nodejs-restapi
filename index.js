const Joi = require('joi');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const logger = require('./middleware/logger');
const port = process.env.PORT || 3000;

app.use(logger);

app.get('/', (req, res) => {
    res.send('<h1>Hello Buddy, welcome to my RESTful service :)</h1>');
});

app.use('/api/courses', courses);


app.use((req, res) => {
    res.status(404).send("Sorry, the page you visited does not exist");
});

app.listen(port, () => console.log('listening on http://localhost:3000'));
