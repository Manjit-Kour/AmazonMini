require('dotenv').config({path:__dirname+'/.env'});

const express= require('express');
const cors=require('cors');
const path = require('path');
const app=express();
const port=8000;
const productRoutes=require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');
const mongoose  = require('mongoose');

app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'public/images')));




mongoose.connect(process.env.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err));

app.use('/products',productRoutes);
app.use('/user',userRoutes);
app.get('/',(req,res)=>{
    res.send('server is running');
})

app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})