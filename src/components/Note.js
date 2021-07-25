import React from 'react'

const Note = ({note, toggleImportant,deleteNote}) => {
    const liStyle = {
        listStyle: 'none',
    }
    const buttonStyle = {
        margin: '5px'
    }
    const label = note.important ? 'mark no important' : 'mark important'
    return (
        <li style={liStyle}>
            {note.content}
            <button onClick={toggleImportant} style={buttonStyle}>{label}</button>
            <button onClick={deleteNote} style={buttonStyle}>Delete</button>
        </li>
    )
}

export default Note
