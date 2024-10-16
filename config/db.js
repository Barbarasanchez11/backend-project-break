const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database has been connected');
    } catch (error) {
        console.error(error);
        throw new Error('There was a problem trying to connect with database');
    }
};

module.exports = dbConnection