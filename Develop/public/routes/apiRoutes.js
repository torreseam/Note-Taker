let fs = require('fs');
let util = require('util');
let store = require('./Develop/db/db');
let readFileAsync = util.promisify(fs.readFile);
let writeFileAsync = util.promisify(fs.writeFile);

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