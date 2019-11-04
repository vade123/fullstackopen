import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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

    const handleFilterChange = (event) => {
        setFilter(event.target.value) 
    }

    return (
        <div>
        <h2>Phonebook</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <h2>Add a new</h2>
        <PersonForm
            addPerson={addPerson}
            valueName={newName} onChangeName={handleNameChange}
            valueNumber={newNumber} onChangeNumber={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons filter={filter} persons={persons}/>
        </div>
    )
}

export default App