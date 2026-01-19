import   express from "express" ;
import bodyParser from "body-parser" ;
import blogrouter from "./router/blogrouter.js" ;
import cors from "cors" ;
import mongoose from  "mongoose" ;
import path from "path";

import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env file


const app = express() ;

app.use(express.json()) ;
app.use("/uploads", express.static("uploads")); 
app.use(bodyParser.urlencoded({ extended: true })) ;
app.use(cors()) ;

app.use( "/api" , blogrouter) ;




const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@product.gbmwwiy.mongodb.net/?appName=${process.env.MONGO_DB_DATABASE}`;
mongoose.connect(url).then( () => {
    app.listen(3000 , () => {
        console.log(process.env.MONGO_DB_USERNAME) ;
    console.log("server is listening on port 3000");    }) ;

})