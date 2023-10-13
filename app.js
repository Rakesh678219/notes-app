/** @format */

const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");
// const command = process.argv?.[2];

// console.log(process.argv);
// if (command === "add") {
//   console.log("Adding Note!");
// } else if (command === "remove") {
//   console.log("Removing Note!");
// }

//customize args version

yargs.version("1.1.0");

//create add command

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//create remove command

yargs.command({
  command: "remove",
  describe: "Delete Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

//create list command

yargs.command({
  command: "list",
  describe: "List note",
  handler: function () {
    notes.listNotes();
  },
});

//create read command

yargs.command({
  command: "read",
  describe: "Read Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse(); //this is important
// console.log(yargs.argv);
