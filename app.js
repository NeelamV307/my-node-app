const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.info('MONGODB IS CONNECTED SUCCESSFULLY');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

mongoConnect();

const kittySchema = new mongoose.Schema({
  name: String,
});

const Kitten = mongoose.model('Kitten', kittySchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/status', (req, res) => {
  const status = {
    'Status': 'Running',
  };
  res.json(status); // Send the status object as JSON
});

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.post('/post', async (req, res) => {
  try {
    console.info(req.body, 'req body');
    const obj = {
      name: req.body.name,
    };
    const kitty = new Kitten(obj);
    await kitty.save();
    res.send('POST!!!!');
  } catch (error) {
    console.error('Error saving to the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server app is running at http://localhost:${PORT}`);
});
