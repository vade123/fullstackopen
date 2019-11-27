const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

let persons = [
    {
        name: "Arto Hellas",
        number: "124251233",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      }
];

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/info', (req, res) => {
    const count = persons.length;
    const date = new Date();
    res.send(
        `Phonebook has info for ${count} people <br />
        <br />
        ${date}`
    );
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    };
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        });
    };
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        });
    };
    if (persons.find(person => person.name === body.name) !== undefined) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    };
    const newId = Math.floor(Math.random() * 10000000);
    const person = {
        name: body.name,
        number: body.number,
        id: newId
    };
    persons = persons.concat(person);
    res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});