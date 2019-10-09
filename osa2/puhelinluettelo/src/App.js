import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]) 
    const [ newName, setNewName ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        
        if (persons.find(person => person.name === newName) != undefined){
            alert(`${newName} is already added to phonebook`)
        } else {
            const personObject = {
                name : newName
            }
            setPersons(persons.concat(personObject))
        }
        setNewName('')
        console.log(persons)
    
    }
    
    const handleNoteChange = (event) => {
        setNewName(event.target.value)
    }

    const rows = () => persons.map(person =>
        <li key={person.name}>
            {person.name}
        </li>
    )

    return (
        <div>
        <h2>Phonebook</h2>
        <form onSubmit={addPerson}>
            <div>
                name: <input
                        value = {newName}
                        onChange = {handleNoteChange} />
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