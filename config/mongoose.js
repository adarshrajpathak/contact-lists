//importing mongoose module
const mongoose=require('mongoose');

//connecting with the database
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');
                // mongodb://localhost/test(i.e.,database name) but due to ipv6 preferred by nodejs 18+

//creating variable to acquiring/accessing database
const db=mongoose.connection;

//on error
db.on('error',console.error.bind(console,'error connecting to db!'));

//on fire up and running
db.once('open', function(){
    console.log("Successfully connected to the db!");
})