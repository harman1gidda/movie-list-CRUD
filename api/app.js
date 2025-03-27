const express = require('express');
const app = express();
const port = 8081;

const knex = require('knex')(require('./knexfile.js')["development"]);

// require knex pull the library, and the excuses the function that require specific knexfile.js
// development indicates which specific client to use within knexfile.js

const cors = require('cors');
app.use(cors());
app.use(express.json()); //this is a middleware that allows us to parse json data

app.get('/', (req, res) => {
  res.send("application is up and running")
})

app.listen(port, () =>{
  console.log(`Your Knex and Express applications are running succesfully at port: ${port}`)
})

//----get----//
app.get('/movies', (req, res)=>{
  knex('movies')
  .select('*')
  .then(data => {
    res.json(data)
  })
})

app.get('/movies/:id', (req, res)=>{
  let getId = req.params.id
  knex('movies')
  .select('*')
  .where({'id': parseInt(getId)})
  .then(data => {
    res.json(data)
  })
})

//---post----//
app.post('/movies', (req, res)  =>{
  const {id, title} = req.body

  knex('movies')
      .insert({id, title})
      .then( function() {
          res.json({succeess: true, message: 'ok'})
      })
})

//---patch----//
app.patch('/movies/:id', (req, res) => {
  let getId = req.params.id
  const {title} = req.body;

  knex('movies')
      .where({ "id": getId})
      .update({title})
      .then(function() {
          res.json({success: true, message: 'ok'})
      })
      .catch(err => {
          res.json(err)
      })
})

//---delete----//
app.delete('/movies/:id', (req, res) => {
  let getId = req.params.id
  knex('movies')
      .where({"id" : getId})
      .del()
      .then(function(){
          res.json({succeess: true, message: 'ok'})
      })
})

//---join----//