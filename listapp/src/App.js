import { useState, useEffect } from "react"
import Note from './components/Note'
import axios from 'axios'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    const promise = axios.get('http://localhost:3001/notes')
    promise.then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll ? 
    notes : notes.filter(note => note.important)

  const addNote = (event) => {
    console.log(event)
    event.preventDefault()
    const noteObj = {
      content: newNote, 
      date: new Date().toISOString,
      important: Math.random() < .5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObj))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

export default App;
