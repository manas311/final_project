const express = require("express")
const logRoutes = express.Router();
const fs = require('fs');

const dataPath = './logdata/log.json' 

const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/metaDataDB", {useNewUrlParser:true});

const MetaSchema = 
  {
    "name": String,
    "path_lower": String,
    "path_display": String,
    "id": String,
    "client_modified": Date,
    "server_modified": String,
    "rev": String,
    "size": Number,
    "is_downloadable": Boolean,
    "content_hash": String
  }

  const Meta = mongoose.model("Meta", MetaSchema);

// util functions 

const saveLogData = (data) => {
    const stringifyData = JSON.stringify(data)
    const m = new Meta (data)
    m.save()
    fs.writeFileSync(dataPath, stringifyData)
}

const getLogData = () => {
    const jsonData = fs.readFileSync(dataPath)
    const data = Meta.find({});
    console.log(data);
    return JSON.parse(jsonData)    
}


// reading the data
logRoutes.get('/log', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const data2 = Meta.find({});
      console.log(data2);
      res.send(JSON.parse(data2));
    });
  });


  logRoutes.post('/log/addlog', (req, res) => {
   
    var existLogs = getLogData()
    const newLogId = Math.floor(100000 + Math.random() * 900000)
   
    existLogs[newLogId] = req.body
     
    console.log(existLogs);

    saveLogData(existLogs);
    res.send({success: true, msg: 'Log data added successfully'})
})

// Read - get all accounts from the json file
logRoutes.get('/log/list', (req, res) => {
  const logs = getLogData()
  res.send(logs)
})

module.exports = logRoutes
