//Routes-cant get routes to function without an error
// const apiRoutes = require('./Develop/public/routes/apiRoutes');
// const htmlRoutes = require('./routes/htmlRoutes');


//Dependancies 
const path = require('path');
const express = require('express');
const fs = require('fs')


//express - initialize and create
const PORT = process.env.PORT || 3001;
const app = express();
const { v4: uuidv4 } = require('uuid');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());
app.use(express.static('Develop/public'));


//establish routes 
app.get('/api/notes', (req, res) => {
    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
        res.json(JSON.parse(data));
    });
    //comment out 53-55
    // if (req.query) {
    //     results = filterByQuery(req.query, results);
    // }
});

// app.get('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.json(result);
//     } else {
//         res.sendStatus(404);
//     }
// });
 
app.post('/api/notes', (req, res) => {
    // set id by unique identifier uuidv4 package
    req.body.id = uuidv4();
    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
        console.log(data);
        let dataArray=JSON.parse(data);
        dataArray.push(req.body);
        fs.writeFile("./Develop/db/db.json", JSON.stringify(dataArray), (err) => {
            if (err) {
                console.log(err);
            }else{
                console.log("note written")
            }
        })
    })
    res.json(req.body);
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
        console.log(data);
        let dataArray = JSON.parse(data);
        let dataResult = dataArray.filter(note => note.id !== req.params.id);
        fs.writeFile("./Develop/db/db.json", JSON.stringify(dataResult), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Note in trash bin")
            }
            res.end();
        })
    });
});

//html route  routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});



//listen for port 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});