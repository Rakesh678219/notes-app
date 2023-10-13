/** @format */

const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("Added note"));
  } else {
    console.log(chalk.red.inverse("Note already exists"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();

  const foundNote = notes.find((note) => note.title === title);

  if (foundNote) {
    console.log(chalk.inverse("Title - " + foundNote.title));
    console.log("Body " + foundNote.body);
  } else {
    console.log(chalk.red.inverse("No Note found"));
  }
};
const removeNote = (title) => {
  const notes = loadNotes();

  const filteredNotes = notes.filter((note) => {
    return note.title !== title;
  });

  saveNotes(filteredNotes);

  if (notes.length === filteredNotes.length) {
    console.log(chalk.red.inverse("Note " + title + " not found "));
  } else {
    console.log(chalk.green("Removed note " + title + " successfully "));
  }
};

const listNotes = () => {
  console.log(chalk.inverse("Listing notes"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const stringifiedNotes = JSON.stringify(notes);
  fs.writeFileSync("notes.json", stringifiedNotes);
};
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
