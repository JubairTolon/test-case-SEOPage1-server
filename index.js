const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const uploadRoute = require('./routes/attachment');

const app = express();
app.use(cors());
app.use(express.json());

// Use uploadRoute as middleware
app.use('/api', uploadRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));
