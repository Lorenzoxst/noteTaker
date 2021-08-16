const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid')

const dir = path.join(__dirname, "/public");

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get("*", function(req, res) {
    res.sendFile(path.join(dir, "index.html"));
});

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(dir, "notes.html"));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get('/api/notes/:id', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});

app.post("/api/notes", function(req, res) {
    let saved = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    newNote.id = uuidv4();
    saved.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(saved));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(saved);
})

app.listen(PORT, ()=> 
    console.log(`Note Taker is listening at http://localhost:${PORT}`)
);