const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = 9080;
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

let REQUEST_COUNT = 0

app.use(cors());
app.use(bodyParser.json());

app.get('/xyz/:video_name', (req, res) => {


    console.log("hello");
    const range = req.headers.range;

    if (!range) {
        res.status(400).send("Requires Range header");
    }


    REQUEST_COUNT++;
    const file = req.params.video_name;
    console.log(file)
    const data = {
        "file": file
    }
    if (REQUEST_COUNT % 2 == 0) {
        fetch('http://localhost:8000/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((json) => {
                console.log(json)

                const videoPath = json.path;
                const videoSize = fs.statSync(videoPath).size;
                const CHUNK_SIZE = 10 ** 6;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(206, headers);
                const videoStream = fs.createReadStream(videoPath, { start, end });
                videoStream.pipe(res);

            })
            .catch(err => console.log(err));
    } else {
        fetch('http://localhost:4200/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then((json) => {
                const videoPath = json.path;
                console.log(json)
                const videoSize = fs.statSync(videoPath).size;
                const CHUNK_SIZE = 10 ** 6;
                const start = Number(range.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
                const contentLength = end - start + 1;
                const headers = {
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": contentLength,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(206, headers);
                const videoStream = fs.createReadStream(videoPath, { start, end });
                videoStream.pipe(res);
            })
            .catch(err => console.log(err));
    }
})

app.get("/videos", async (req, res) => {
    console.log("working...")
    const result = {}
    const videos = await DataBase.collection("videos").find({});
    await videos.forEach(video => {
        result[video._id] = video
    })
    res.send(result);
})

app.get("/admin_login", (req, res) => {

    const data = req.query;
    DataBase.collection("Admin_Details").findOne({ LoginId: data.id, password: data.password }, (err, result) => {
        if (err) throw err

        else {
            if (result != null) {
                res.send({ status: 200, name: result.name });
            }
            else {
                res.send({ status: 401, name: "" });
            }
        }

    })
})

app.get("/user_login", (req, res) => {

    const data = req.query;
    DataBase.collection("User_Details").findOne({ LoginId: data.id, password: data.password }, (err, result) => {
        if (err) throw err
        else {
            if (result != null) {
                res.send({ status: 200, name: result.name });
            }
            else {
                res.send({ status: 401, name: "" });
            }
        }
    })
})

var DataBase;

function DB_CONECTION() {
    mongoose.connect("mongodb://localhost:27017/cdn-backend", (err, db) => {
        if (err) {
            console.log("ERROR");
            DB_CONECTION();
        }

        else {
            DataBase = db;
            console.log("mongodb running successfully");
        }
    });
}

app.get("/admin_login", (req, res) => {

    const data = req.query;
    DataBase.collection("Admin_Details").findOne({LoginId:data.id , password: data.password},(err,result)=>{
        if(err)throw err

        else
        {
            if(result!=null)
            {
                res.send({status:200,name:result.name});
            }
            else
            {
                res.send({status:401,name:""});
            }
        }
  
    })
})

app.get("/user_login", (req, res) => {

    const data = req.query;
    DataBase.collection("User_Details").findOne({LoginId:data.id , password: data.password},(err,result)=>{
        if(err)throw err

        else
        {
            if(result!=null)
            {
                res.send({status:200,name:result.name});
            }
            else
            {
                res.send({status:401,name:""});
            }
        }
  
    })

})


app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
    DB_CONECTION();
})