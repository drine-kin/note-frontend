import React from 'react'

const Note = ({note, toggleImportant,deleteNote}) => {
    const liStyle = {
        listStyle: 'none',
    }
    const buttonStyle = {
        margin: '5px'
    }
    const label = note.important ? 'make no important' : 'make important'
    return (
        <li style={liStyle}>
            <span>{note.content}</span>
            <button onClick={toggleImportant} style={buttonStyle}>{label}</button>
            <button onClick={deleteNote} style={buttonStyle}>Delete</button>
        </li>
    )
}

export default Note
