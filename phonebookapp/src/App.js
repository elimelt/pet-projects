import { useState, useEffect } from 'react'
import Entries from './components/Entries'
import Search from './components/Search'
import AddEntry from './components/AddEntry'
import personsService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('first name')
    const [newNumber, setNewNumber] = useState('(xxx) xxx-xxxx')
    const [currPersons, setNewCurrPersons] = useState([])
    const [nextId, setNextId] = useState(1)
    const [currMessage, setCurrMessage] = useState(null)
  
    useEffect(() => {
        personsService
            .getAll()
            .then(people => { 
                setPersons(people)
                let maxID = 0
                people.forEach(person => {
                    if (person.id > maxID) maxID = person.id
                })
                setNextId(maxID + 1)
            })
    }, [])

    const addEntry = (event) => {
        event.preventDefault()
        if (persons.number === newNumber) 
            alert(`record for ${newName} or ${newNumber} is already in the phonebook`)
        else if (persons.some((person) => person.name === newName)) {
            if (window.confirm(`${newName} is already in the phone book. Replace number?`)){
                const i = persons.findIndex(person => person.name === newName)
                personsService
                    .update(persons[i].id, {name: newName, number: newNumber, id: nextId})
                    .then(newPerson => { 
                        console.log('new person',newPerson)
                        const newPersons = persons.map((person, index) => {
                            return (i === index) ? newPerson : person   
                        })
                        newPersons[i] = newPerson
                        console.log('p', persons)
                        console.log('new persons', newPersons)
                        if (Object.keys(persons).length !== 0 ) setPersons(newPersons)
                        setCurrMessage({text: 'success', messageClass: 'success'})
                        setTimeout(() => setCurrMessage(null), 1000)
                    }).catch(err => {
                        setCurrMessage({text: 'error name already removed', messageClass: 'error'})
                        setTimeout(() => setCurrMessage(null), 1000)
                    })
                personsService.getAll().then(people => setPersons(people))
            }
            
        }else {
            const newObj = {
                name: newName, 
                number: newNumber, 
                id: nextId
            }
            //setPersons(persons.concat(newObj))
            personsService
                .create(newObj)
                .then(newEntry => 
                    setPersons(persons.concat(newObj)
               ))
               setCurrMessage({text: 'success', messageClass: 'success'})
            setTimeout(() => setCurrMessage(null), 1000)
        }
        setNewName('')
        setNewNumber('')
        setNextId(nextId + 1)
        
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

    const deleteEntry = id => {
        const p = persons.find(person => person.id === id)
        if (window.confirm(`are you sure you want to delete ${p.name}`)){
            //console.log('pre', persons)
            const newPersons = persons.filter(person => person.id !== id)
            //console.log('post', newPersons)
            personsService.deletePerson(id)
            setPersons(newPersons)
        }
    }

    return (
      <div>
        <Notification message={currMessage}/>
        <h1>Phonebook</h1>
        <Search searchChange={searchChange}/>
        <AddEntry 
            addEntry={addEntry} 
            newName={newName} 
            newNumber={newNumber}
            inputNameChange={inputNameChange}
            inputNumberChange={inputNumberChange}
        />
        <Entries persons={persons} handleDelete={deleteEntry}/>
      </div>
    )
  }
export default App