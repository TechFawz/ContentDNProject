const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

app.use(bodyParser.json());
// Without middleware
app.post('/', async function(req, res){
    const fileName = req.body.file
    const video = await DataBase.collection("videos").find({'name': fileName});
    await video.forEach(video => {
        res.status(200).json({path: video.video_path})
    })
});
 
function DB_CONECTION()
{
    mongoose.connect("mongodb://localhost:27017/cdn-backend", (err, db) => {
        if (err)
        {
            console.log("ERROR");
            DB_CONECTION();
        }

        else {
            DataBase = db;
            console.log("mongodb running successfully");
        }
    });
}

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
    DB_CONECTION();
});