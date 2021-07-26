import React, { useState } from 'react'

const AddNote = ({addNote}) => {
    const [ newNote, setNewNote ] = useState('')

    const handleNoteChange = (e) => {
        e.preventDefault()
        setNewNote(e.target.value)
      }
    
    const addNoteData = (e) => {
        e.preventDefault()
        const newNoteToAdd = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }

        addNote(newNoteToAdd)
        setNewNote('')
    }
    return (
        <div>
            <h2>Create a new note</h2>
            <form onSubmit={addNoteData}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type='submit' disabled={!newNote}>Add</button>
            </form>
        </div>
        
    )
}

export default AddNote
