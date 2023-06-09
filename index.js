const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eaxagba.mongodb.net/?retryWrites=true&w=majority`;
// respond with "hello world" when a GET request is made to the homepage



app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('hello Tauhid')
})
