const fs = require('fs')
const chalk = require('chalk');

const getNotes = () => 'Your notes..';

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => {note.title === title})

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen('New note added'))
  } else {
    if (duplicateNotes.length != 0) {
      console.log(chalk.bgRed('Note title already used, please use a new title..'))
    }
  }
}


const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
  } catch (error) {
    return []
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  if (notesToKeep.length === notes.length) {
    console.log(chalk.bgRed('No note found..'))
  } else {
  saveNotes(notesToKeep)
  console.log(chalk.bgGreen('Note removed..'))
  }
}

const listNotes = () => {
  const loadedNotes = loadNotes();
  if (loadedNotes.length === 0) {
    console.log(chalk.bgRed('No notes to list..'))
  } else {
    console.log(chalk.bgGreen('Your notes..'))
    loadedNotes.forEach((note) => {
      console.log(note.title)
    })
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)
  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.bgRed('No note found!'))
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
}