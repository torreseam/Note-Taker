//Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Dependancies 
const path = require('path');
const express = require('express');
const fs = require('fs');
const { notes } = require('./Develop/db/db.json');
// const { notes } = require('./Develop/db/db.json');

//express - initialize and create
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());
app.use(express.static('Develop/public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


function findById(id, noteArray) {
    const result = noteArray.filter(note => note.id === id)[0];
    return result;
}

function createMoreNotes(body, notesArray) {
    //body is coming from req.body app.post
    const notes = body;
    //main function below
    notesArray.push(notes);

    fs.writeFileSync(
        path.join(__dirname, '/Develop/db/ db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    // return finished code to post route for response
    return note;
}

//establish routes 
app.get('/api/notes', (req, res) => {
    let results = notes;
//     if (req.query) {
//         results = filterByQuery(req.query, results);
//     }
    res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

app.post('/api/notes', (req, res) => {
    // set id based on what the next index of array
    req.body.id = notes.length.toString();
    const notes = createMoreNotes(req.body, notes);
    res.json(req.body);
});







//listen for port 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});