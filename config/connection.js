const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb+srv://MCReagan:michael312@classactivities.2d6rdyh.mongodb.net/mygroceryDB');

// Export connection
module.exports = mongoose.connection;
