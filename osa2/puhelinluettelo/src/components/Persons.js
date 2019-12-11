import React from 'react'

const Persons = ({filter, persons, deletePerson}) => {
    const personsToShow = filter === "" 
        ? persons 
        : persons.filter(person => person.name.toLowerCase().includes(filter))
    const li = {
        marginLeft: 30,
    }
    return (
        personsToShow.map(person =>
            <li key={person.name} style={li}>
                {person.name} {person.number}
                &emsp;
                <button onClick={() => deletePerson(person.id)}>Delete contact</button>
            </li>
        )
    )
}

export default Persons