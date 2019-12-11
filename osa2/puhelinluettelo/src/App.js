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
    const [ notification, setNotification ] = useState([null, ''])

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
                        console.log(returnedPerson.name)
                        setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
                        setNotification([`${returnedPerson.name}'s number updated`, 'green'])
                        setTimeout(() => {
                            setNotification([null, ''])
                        }, 3000)
                    })
                    .catch(error => {
                        setNotification([`the person '${person.name}' was already deleted from the server`, 
                                        'red'])
                        setTimeout(() => {
                            setNotification([null, ''])
                        }, 3000)
                        setPersons(persons.filter(p => p.id !== person.id))
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(personCreated => {
                    setPersons(persons.concat(personCreated))
                    setNotification([`Added ${personCreated.name}`, 'green'])
                    setTimeout(() => {
                        setNotification([null, ''])
                    }, 3000)
                })
                .catch(error => {
                    console.log(error.response.data)
                    setNotification([error.response.data.error, 'red'])
                    setTimeout(() => {
                        setNotification([null, ''])
                    }, 5000)
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
                    setNotification([`Deleted ${person.name}`, 'green'])
                    setTimeout(() => {
                        setNotification([null, ''])
                    }, 3000)
                })
                .catch(error => {
                    setNotification([`the person '${person.name}' was already deleted from the server`, 
                                    'red'])
                    setTimeout(() => {
                        setNotification([null, ''])
                    }, 3000)
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
        <Notification message={notification[0]} color={notification[1]} />
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