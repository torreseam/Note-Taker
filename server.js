//Routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Dependancies 
const path = require('path');
const express = require('express');
const fs = require('fs');

//express - initialize and create
const Port = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());
app.use(express.static('Develop/public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}

// function createNewAnimal(body, animalsArray) {
//     //body is coming from req.body app.post
//     const animal = body;
//     //main function below
//     animalsArray.push(animal);

//     fs.writeFileSync(
//         path.join(__dirname, '/data/animals.json'),
//         JSON.stringify({ animals: animalsArray }, null, 2)
//     );

//     // return finished code to post route for response
//     return animal;
// }









//listen for port 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});