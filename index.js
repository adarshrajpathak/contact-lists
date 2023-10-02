//creating the server for the CONTACT_LIST Web App
const http=require('http'); //importing the http module
const port=5000;            //asssiging the port number
const path=require('path');
const express=require('express');   //importing the express module
const bodyParser = require('body-parser');

//importing mongoose
const db=require('./config/mongoose');
//importing the Contact Model
const Contact=require('./models/contact');

const app=express();        //creating the instance of express
//configuring the ejs
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//body-parser middleware
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended:false}));

//using built-in express.static middleware for serving the static files
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'node_modules','bootstrap','dist')));

    // //using some of the self-made middleware
    // app.use(function(req,res,next){
    //     console.log("MW1");
    //     req.nameI="adarsh";
    //     next();
    // })
    // app.use(function(req,res,next){
    //     console.log("MW2");
    //     console.log(req.nameI);
    //     next();
    // })
    
app.get('/',function(req, res,next){
        //     // res.send("<body style='background-color:cyan; height:100vh; width:100vw; margin:0;'><h1>Hello World</h1></body>");
        // res.render('html.ejs',{
        //     contact_list:contactList,
        //     author:'Adarsh Raj Pathak',
        //     year:2023,
        //     major:1,
        //     minor:0,
        //     patch:0
        // });
    //fetching from the database
    Contact.find({})
    .then((contacts)=>{
        // console.log(contacts);
        res.render('html.ejs',{
            contact_list:contacts,
            author:'Adarsh Raj Pathak',
            year:2023,
            major:1,
            minor:0,
            patch:0
        })
    }).catch((err)=>{
        if(err){
            console.log('error while fetching the database',err);
        }
    })
})

app.get('/success',function(req,res){
    res.send("<h1>Sucessfully Added</h1>");
})

app.post('/create-contact',function(req, res){
        //     // contactList.push({
        //     //     imgURL:req.body.imgURL,
        //     //     fullName:req.body.fullName,
        //     //     phoneNo:req.body.phoneNo
        //     // })
        // contactList.push(req.body);
        //     // res.redirect('/');
        // res.redirect('back');
        //     // console.log(req.body);
        //     // console.log(req.body.fullName);
        //     // console.log(req.body.phoneNo);
        //     // res.redirect('/success');
    //using the Contact model to save to the database
    //#model.create(newCollection,callbackfunction(error, newContact_that_was_crated));
    if(req.body.imgURL==''){
        req.body.imgURL="../res/placeholder_user.png";
    }
    Contact.create({
        imgURL:req.body.imgURL,
        fullName: req.body.fullName,
        phoneNo: req.body.phoneNo
    })
    .then((newContact) => {
        console.log('*****', newContact, '*****');
        return res.redirect('back');
    })
    .catch((err) => {
        console.log('error is:', err);
        return;
    })
});


var contactList=[
    {   
        imgURL:'https://hips.hearstapps.com/hmg-prod/images/best-guard-dog-breeds-akita-1648472919.jpg?crop=1xw:1xh;center,top&resize=980:*',
        fullName:'Adarsh Raj',
        phoneNo:'7320053302'
    },
    {   
        imgURL:'',
        fullName:'Sakshi Jha',
        phoneNo:'8409986252'
    }
]

//route and controller for the delete button
    // //using params
app.get('/delete-contact/:id',function(req,res){
            // // console.log(req.params);
            // let phone=req.params.phone;
            // for(let i=0;i<contactList.length;i++){
            //     if(contactList[i].phoneNo==phone){
            //         contactList.splice(i,1);
            //     }
            // }
            // console.log(contactList);
            // return res.redirect("/");
    //get the id from the params
    let id=req.params.id;
    //find and delete the id in db with help of Contact Model
    Contact.findByIdAndDelete(id)
    .then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log("error deleting the entry in db",err);
    })
    return res.redirect('back');
})
    //using query params
        // app.get('/delete-contact/',function(req,res){
        //     console.log(req.query);
        //     let phoneNo=req.query.phoneNo;
        // })

app.listen(5000,function(err){
    if(err){
        console.log("Error Detected!!",err);
    }
    console.log("Server is up running WebApp at port :", port);
})
