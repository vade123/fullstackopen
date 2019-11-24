const express = require('express');
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
    )
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});