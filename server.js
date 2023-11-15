const express = require('express');
const fs= require("fs");
const path = require("path");
const PORT = 3000;
const bodyParser=require("body-parser"); 
const server = express();
server.use(bodyParser.urlencoded({extended:false}))
server.use(bodyParser.json())
server.use(express.static(__dirname));
server.listen(PORT, () => {
console.log(`Server running on PORT: ${PORT}/`);
});
server.get("/",(req,res) =>{
    res.sendFile("Index.html")
})
server.get("/download",(req,res)=>{
    fs.readFile(__dirname+ "\\quiz.json",{oncoding: "utf-8"}, (err,data)=>{
        if (err){
            res.send(err);
            return;
        }
        res.send(data);
    })
})