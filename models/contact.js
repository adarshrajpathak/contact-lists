//importing the module
const mongoose=require('mongoose');

//creating the Contact Schema
const contactSchema=new mongoose.Schema({
    //field
    imgURL:{
        type:String,
        default:'../res/placeholder_user.png'
    },
    fullName:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    }
})

//creating model or Compiling schema into the model
const Contact=mongoose.model('Contact',contactSchema);

//exporting the Contact model to index file
module.exports=Contact;