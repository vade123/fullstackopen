import React from 'react'

const Persons = ({filter, persons}) => {
    const personsToShow = filter === "" 
        ? persons 
        : persons.filter(person => person.name.toLowerCase().includes(filter))

    return (
        personsToShow.map(person =>
            <li key={person.name}>
                {person.name} {person.number}
            </li>
        )
    )
}

export default Persons