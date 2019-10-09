import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
        {   name: 'Arto Hellas',
            number: '040-1234567'     }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        
        if (persons.find(person => person.name === newName) !== undefined){
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name : newName,
                number : newNumber
            }
            setPersons(persons.concat(personObject))
        }
        setNewName('')
        setNewNumber('')
    }
    
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const rows = () => persons.map(person =>
        <li key={person.name}>
            {person.name} {person.number}
        </li>
    )

    return (
        <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
            <div>
                name: <input
                        value = {newName}
                        onChange = {handleNameChange} />
            </div>
            <div>
                number: <input
                            value = {newNumber}
                            onChange = {handleNumberChange} /> 
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        {rows()}
        </div>
    )

}

export default App