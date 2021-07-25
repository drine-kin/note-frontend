//import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Error from './components/Error'
import Footer from './components/Footer'
import Note from './components/Note'
import noteService from './services/Note'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ username, setUsername] = useState('') 
  const [ password, setPassword] = useState('') 
  const [ user, setUser ] = useState(null)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
      <input type="text" value={username} name="username" onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div>
      passowrd
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <button type="submit">Login</button>
  </form>
  )
  
  const noteForm = () => (
    <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit' disabled={!newNote}>Add</button>
      </form>
  )
  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(ex){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
  }

  const addNote = (e) => {
    e.preventDefault()
    const newNoteToAdd = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    //console.log('adddddddddddd', newNoteToAdd);
    noteService
    .create(newNoteToAdd)
    .then( returnedNotes => {
      //console.log('after addd', returnedNotes)
      newNoteToAdd.id= returnedNotes.id
      setNotes(notes.concat(newNoteToAdd))
      setNewNotes('')
    })
  }

  const handleNoteChange = (e) => {
    e.preventDefault()
    setNewNotes(e.target.value)
  }

  const handleShowChange = () => {
    setShowAll(!showAll)
  }

  const handleToggleImportant = (id) => {
    const noteToChange = notes.find( note => note.id === id)
    //console.log('noteTOChange ',noteToChange)
    const changedNote = { ...noteToChange, important: !noteToChange.important}
    //console.log('changedNote ',changedNote)
    noteService
    .update(id, changedNote)
    .then( returnedNotes => {
     // console.log("updateeeeeeeeeeeee",returnedNotes)
      setNotes(notes.map( note => note.id !== id ? note :returnedNotes))
    })
    .catch(error => {
      //console.log('errror',error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    })
  }

  const handleDeleteNote = (id) => {
    //console.log('deleteeeeeee ', id);
    noteService
    .delete(id)
    .then( returnedNotes => {
      setNotes(notes.filter( note => note.id !== id))
    })
    .catch(error => {
      //console.log('errror',error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    })
  }

  const noteToShow = showAll ? notes : notes.filter( note => note.important === true)

  useEffect(() => {
    noteService
    .getAll()
    .then( initialNotes => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedNoteAppUser = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedNoteAppUser){
      const user = JSON.parse(loggedNoteAppUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  
  return (
    <div>
      <h1>Notes</h1>
      <Error message={errorMessage}/>

      { user === null 
      ? loginForm() 
      : <div>
        <p>{user.username} logged in  <button onClick={handleLogout}>Log out</button> </p> 
        {noteForm()}
        <div>
        <button onClick={handleShowChange}>Show {showAll ? 'All' : 'Important'}</button>

        </div>
        <ul style={{padding: '5px'}}>
          {noteToShow.map(note => 
            <Note key={note.id} note={note} toggleImportant={ () => handleToggleImportant(note.id)} deleteNote={ () => handleDeleteNote(note.id)}/>
          )}
        </ul>
        </div>}

     
      
      <Footer />
    </div>
  )
}

export default App

