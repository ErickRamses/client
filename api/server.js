const express = require("express")
const mongoose = require("mongoose")

const bcrypt=require("bcrypt")
const Todo =require("./models/Todo")
const Info = require("./models/Info")
const app=express()
app.use(express.json())

//app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://127.0.0.1:27017/mern', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
})
.then(() => {  
    console.log("Connected to MongoDB")})
.catch(console.error);

//fisrt register then login fetch data then sycn(post request name contra&data remplse) r l u


app.post("/todo/register", async(req,res)=>{
    try{
        const user1 = await Todo.findOne({
            name: req.body.name,
        })
        if (user1) {
            res.status(400).send({ status: 'error', error: 'Invalid name' }) 
            return;
        
        }
        const hashed = await bcrypt.hash(req.body.password,10)
        const user ={name:req.body.name,password:hashed}
        const todo = await Todo.create(user)
        const info= await Info.create({name:req.body.name,info:[[],[]]})
        //also create info same name and null info
        todo.save()
        res.json(todo)
        //here new user and other collecrtion of data?
        //or update data in 
    }catch{res.status(501).send()}
})
app.post("/todo/login", async(req,res)=>{
   // console.log("lllllllll")
  
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

        //filter if empty not change
        const user = await Todo.findOne({
            name: req.body.name,
        })
        if (!user) {
            res.status(400).send({ status: 'error', error: 'Invalid login' }) 
        }
        try{
            if(await bcrypt.compare(req.body.password,user.password)){

                const info = await Info.findOne({
                    name: req.body.name,
                })
                if (!info) {
                    res.status(400).send({ status: 'error', error: 'Invalid login' }) 
                    return;
                }
                if (!req.body.info) {
                    res.status(400).send({ status: 'error', error: 'Invalid login' }) 
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



 