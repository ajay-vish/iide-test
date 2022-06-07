// database connection config being exposed from here

const dbConfig = require('./config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const databaseConfig = mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
})
.then(() => {
    console.log('Succcessfully connected to Database.');
})
.catch(err => {
    console.log(`Database connection failed. \n  Error: ${err} \n`);
    process.exit();
});

module.exports = databaseConfig;