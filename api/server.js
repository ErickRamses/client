const express = require("express")
const mongoose = require("mongoose")
const cookieParser=require("cookie-parser")

const bcrypt=require("bcrypt")
const Todo =require("./models/Todo")
const Info = require("./models/Info")
const app=express()
app.use(express.json())
app.use(cookieParser())

//app.use(express.urlencoded({extended:false}))
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Erick:@cluster0.itibvhy.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("Cluster0").collection("devices");
//   const newUser = new Info({name:"req.body.name",info:[[],[]]})
//   console.log("adsd👽ss")
//   newUser.save();
   
//   // perform actions on the collection object
//   client.close();
// });
require("dotenv").config();

mongoose.connect(`mongodb+srv://Erick:${process.env.Key}@cluster0.itibvhy.mongodb.net/?retryWrites=true&w=majority`, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
})
.then(() => {  
    console.log("Connected to MongoDB")
   

})
.catch(console.error);

//fisrt register then login fetch data then sycn(post request name contra&data remplse) r l u


app.post("/todo/register", async(req,res)=>{
    
    try{
        //const infor= await Info.create({name:"req.body.name",info:[[],[]]})
       // infor.save()
    
        const user1 = await Todo.findOne({
            name: req.body.name,
        })
       // onsole.log("👽")

        if (user1) {
            res.status(400).send({ status: 'error', error: 'Invalid name' }) 
            return;          
        }
   
        const hashed = await bcrypt.hash(req.body.password,10)
        const user ={name:req.body.name,password:hashed}

        const todo = await Todo.create(user)
 
        
        const info= await Info.create({name:req.body.name,info:[[],[]]})
        //also create info same name and null info
       
        res.cookie("pass",hashed,{
            httpOnly:true
        })
        res.cookie("name",req.body.name)

        todo.save()
        res.json(todo)
        //here new user and other collecrtion of data?
        //or update data in 
    }catch(err){

        console.log(err)
        
        res.status(501).send()}
})
app.post("/todo/login", async(req,res)=>{
   //console.log(req.body)
  
    const user = await Todo.findOne({
        name: req.body.name,
	})
	if (!user) {
        res.status(400).send({ status: 'error', error: 'Invalid name' })
        return;
	}
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
           // console.log("works?")
            const info = await Info.findOne({
                name: req.body.name,
            })
            if (!info) {
                res.status(400).send({ status: 'error', error: 'Invalid info' }) 
                return;
            }
             
            res.cookie("pass",user.password,{
                httpOnly:true
            })
            res.cookie("name",req.body.name)

            res.send(info)
            //here back info and do cokies 

        }else{            
            res.status(400).send({ status: 'error', error: 'Invalid password' }) 
            return;

        }
    }catch{res.status(501).send()}
})


// app.delete("/todo/delete/:id",async(req,res)=>{
    //     const result= await Todo.findByIdAndDelete(req.params.id)
    //     res.json(result)
    // })
    // app.get("/todos",async (req,res)=>{
           
    //     //here body is name contra o no eso se hace en login
    //     const todos =await Todo.find();
    //     const todos1=await Info.find();
      
    //     res.send(todos1)
    // })
    
    app.post("/todo/update", async(req,res)=>{
        //here update to collection model info
        //name contra
        //info
       // console.log("cookies🤓",req.cookies.name)
        //filter if empty not change
        const user = await Todo.findOne({
            name: req.cookies.name,
        })
        if (!user) {
            res.status(400).send({ status: 'error', error: 'no user' }) 
        }
        try{
          //  console.log(req.cookies.pass,"😎",req.body.password)
          //more like if cokiepass == userhashed pass
          if(req.cookies.pass==user.password){
            //if(await bcrypt.compare(req.cookies.pass,user.password)){
//change compare cookie pass and name
//console.log("compareted")
                const info = await Info.findOne({
                    name: req.cookies.name,
                })
                if (!info) {
                    res.status(400).send({ status: 'error', error: 'could not find info' }) 
                    return;
                }
                if (!req.body.info) {
                    res.status(400).send({ status: 'error', error: 'no info' }) 
                    return;
                }

                if(req.body.info[0].length != 0 && req.body.info[1].length != 0){
                    info.info = req.body.info
                    
                    //info.save();
                }
                if(req.body.info[0].length==0){
                    info.info[1] = req.body.info[1]
                    //info.save();

                }
                if(req.body.info[1].length==0){
                    info.info[0] = req.body.info[0]
                }
               await info.save();
            
            
               // info.save()
                res.send(info)
                //here back info and do cokies
    
            }else{            
                res.status(400).send({ status: 'error', error: 'Invalid password' }) 
            }
        }catch{res.status(501).send()}


        
        // const todo = await Todo.findById(req.params.id)
        // todo.complete =!todo.complete;
        // todo.save();
        // res.json(todo)
    })



app.listen(3001,()=>{
    console.log("listening 3001")})    



 