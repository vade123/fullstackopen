import React from 'react'

const Persons = ({filter, persons, deletePerson}) => {
    const personsToShow = filter === "" 
        ? persons 
        : persons.filter(person => person.name.toLowerCase().includes(filter))

    return (
        personsToShow.map(person =>
            <li key={person.name}>
                {person.name} {person.number}
                &emsp;
                <button onClick={() => deletePerson(person.id)}>Delete contact</button>
            </li>
        )
    )
}

export default Persons