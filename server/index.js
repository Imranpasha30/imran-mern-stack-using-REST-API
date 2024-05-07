const express = require("express")
const app=express();
const cors = require('cors')
const router = require('./router/auth-router')
const connectDb = require("./utils/db");
const authcontroller = require("./controller/auth-controller");

// handelling policy
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    Credentials:true,
}
app.use(cors(corsOptions));

app.use(express.json());// its a midlware to parsing the json data fromt the requets 
//asked for a middleware function for calling this ffunction from the router 



app.use("/api/auth",router);


 


const PORT=4000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`);
    });
    
    });

