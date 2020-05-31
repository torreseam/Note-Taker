let fs = require('fs');
let util = require('util');
let store = require('./Develop/db/db');
let readFileAsync = util.promisify(fs.readFile);
let writeFileAsync = util.promisify(fs.writeFile);
// const fs = require("fs");
// const path = require("path");
// const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    //get
    app.get("/api/notes", function (req, res) {
        store.getNotes().then((data) => {
            return res.json(data);
        });
    });

    //POST
    app.post("/api/notes", function (req, res) {
        store.addNote(req.body).then((note) => {
            return res.json(note);
        })
    });

    //Delete
    app.delete("/api/notes/:id", function (req, res) {
        store.deleteNote(req.params.id).then(() => {
            return res.json({ ok: true });
        })
    });
};

    // app.get('/api/notes', (req, res) => {
    //     fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    //         res.json(JSON.parse(data));
    //     });
    //     //     if (req.query) {
    //     //         results = filterByQuery(req.query, results);
    //     //     }
    // });

    // app.post('/api/notes', (req, res) => {
    //     // set id by unique identifier uuidv4 package
    //     req.body.id = uuidv4();
    //     fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    //         console.log(data);
    //         let dataArray = JSON.parse(data);
    //         dataArray.push(req.body);
    //         fs.writeFile("./Develop/db/db.json", JSON.stringify(dataArray), (err) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log("note written")
    //             }
    //         })
    //     })
    //     res.json(req.body);
    // });

    // app.delete('/api/notes/:id', (req, res) => {
    //     fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    //         console.log(data);
    //         let dataArray = JSON.parse(data);
    //         let dataFilter = dataArray.filter(note => note.id !== req.params.id);
    //         fs.writeFile("./Develop/db/db.json", JSON.stringify(dataArray), (err) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log("Note in trash bin")
    //             }
    //             res.end();
    //         })
    //     });
    // });
// }