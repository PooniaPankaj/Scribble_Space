const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/local';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
}
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'));
//up and running 
db.once('open',function(){
    console.log('Succesfully connected to the database');
})
module.exports = connectToMongo; 