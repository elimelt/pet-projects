import { useState, useEffect } from 'react'
import Entries from './components/Entries'
import Search from './components/Search'
import AddEntry from './components/AddEntry'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('first name')
    const [newNumber, setNewNumber] = useState('(xxx) xxx-xxxx')
    const [currPersons, setNewCurrPersons] = useState([])
  
    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const addEntry = (event) => {
        event.preventDefault()
        if (persons.some((person) => person.name === newName || persons.number === newNumber)) 
            alert(`record for ${newName} or ${newNumber} is already in the phonebook`)
        else setPersons(persons.concat({name: newName, number: newNumber, id: persons.length + 1}))
        setNewName('')
        setNewNumber('')
    }

    const inputNameChange = (event) => {
        setNewName(event.target.value)
    }

    const inputNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const searchChange = (event) => {
        const fits = (str, value) => str.toLowerCase().includes(value.toLowerCase());
        const filtered = persons.filter(person => fits(person.name, event.target.value))
        setNewCurrPersons(filtered)
    }

    return (
      <div>
        <h1>Phonebook</h1>
        <Search searchChange={searchChange}/>
        <AddEntry 
            addEntry={addEntry} 
            newName={newName} 
            newNumber={newNumber}
            inputNameChange={inputNameChange}
            inputNumberChange={inputNumberChange}
        />
        <Entries persons={persons}/>
      </div>
    )
  }
export default App