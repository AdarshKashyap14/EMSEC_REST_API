require('dotenv').config();
const routes = require('./routes/routes');

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.use('/api', routes)
//pagination
app.get("/", async (req, res) => {
    let { page, limit, sort, asc } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;
  
    const skip = (page - 1) * 10;
    const users = await routes.find()
      .sort({ [sort]: asc })
      .skip(skip)
      .limit(limit);
    res.send({ page: page, limit: limit, users: users });
  });
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})