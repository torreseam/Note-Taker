let fs = require('fs');
let util = require('util');
let store = require('../../db/db.json');
let readFileAsync = util.promisify(fs.readFile);
let writeFileAsync = util.promisify(fs.writeFile);

// const path = require("path");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    //Get 
    app.get('/api/notes', (req, res) => {
        fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
            console.log(data)
            console.log("err", err)
            res.json(JSON.parse(data));
        });
    });

    //Post
    app.post('/api/notes', (req, res) => {
        // set id by unique identifier uuidv4 package
        req.body.id = uuidv4();
        fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
            console.log(data);
            let dataArray = JSON.parse(data);

            // var newId = dataArray.length === 0 ? 1: dataArray[dataArray.length-1].id + 1
            // req.body.id = newId
            dataArray.push(req.body);
            fs.writeFile("./Develop/db/db.json", JSON.stringify(dataArray), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("note written")
                }
            })
        })
        res.json(req.body);
    });

    //Delete
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
}