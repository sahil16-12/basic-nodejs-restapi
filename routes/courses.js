
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const courses = [
    { id: 1, name: 'Node' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Express' },
];

router.use(express.json());

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const t = courses.find(c => c.id === parseInt(req.params.id));
    if (!t) return res.status(404).send("Course with given ID was not found");

    res.send(t);
});



router.post('/', (req, res) => {
    const { error } = validateCourse(req.body);
     if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});



router.put('/:id', (req, res) => {
    //Check whether course is present or not
    const t = courses.find(c => c.id === parseInt(req.params.id));
    if (!t) return res.status(404).send("Course with given ID was not found");

    //validate the input object
    const { error } = validateCourse(req.body);
     if (error) return res.status(400).send(error.details[0].message);

    t.name = req.body.name;
    res.send(t);
});



router.delete('/:id', (req,res) => {
    const t = courses.find(c => c.id === parseInt(req.params.id));
    if (!t) return res.status(404).send("Course with given ID was not found");

    const index = courses.indexOf(t);
    courses.splice(index, 1);
    res.send(t);
});


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(2).required()
    });
    return schema.validate(course);
}

module.exports = router;
