import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ notification, setNotification ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name : newName,
            number : newNumber
        }
        const person = persons.find(person => person.name === newName)
        if (person !== undefined){
            if (window.confirm(`${person.name} is already added to the phonebook,
                replace the old number with a new one?`)) {
                personService
                    .update(person.id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
                        setNotification(`${returnedPerson.name}'s number updated`)
                        setTimeout(() => {
                            setNotification(null)
                        }, 3000)
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(personCreated => {
                    setPersons(persons.concat(personCreated))
                    setNotification(`Added ${personCreated.name}`)
                        setTimeout(() => {
                            setNotification(null)
                        }, 3000)
                })
        }
        setNewName('')
        setNewNumber('')
    }
    
    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== id))
                    setNotification(`Deleted ${person.name}`)
                        setTimeout(() => {
                            setNotification(null)
                        }, 3000)
                })
                .catch(error => {
                    alert(
                        `the person '${person.name}' was already deleted from the server`
                    )
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
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
        <Notification message={notification} />
        <Filter value={filter} onChange={handleFilterChange} />
        <h2>Add a new</h2>
        <PersonForm
            addPerson={addPerson}
            valueName={newName} onChangeName={handleNameChange}
            valueNumber={newNumber} onChangeNumber={handleNumberChange} />
        <h2>Numbers</h2>
        <Persons filter={filter} persons={persons} deletePerson={deletePerson}/>
        </div>
    )
}

export default App