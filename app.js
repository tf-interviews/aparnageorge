const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// require routes for notes and admin
const notes = require('./routes/api/notes');
const admin = require('./routes/api/admin');
const app = express();

// Connecting to Database
connectDB();
// cors
app.use(cors({ origin: true, credentials: true }));

// Initializing Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));

// using routes for notes and admin
app.use('/api/notes', notes);
app.use('/api/admin', admin);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running successfully on port ${port}`));

module.exports = app;