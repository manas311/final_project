const express = require("express")
const logRoutes = express.Router();
const fs = require('fs');

const dataPath = './logdata/log.json' 

// util functions 

const saveLogData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getLogData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


// reading the data
logRoutes.get('/log', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });


  logRoutes.post('/log/addlog', (req, res) => {
   
    var existLogs = getLogData()
    const newLogId = Math.floor(100000 + Math.random() * 900000)
   
    existLogs[newLogId] = req.body
     
    console.log(existLogs);

    saveAccountData(existLogs);
    res.send({success: true, msg: 'Log data added successfully'})
})

// Read - get all accounts from the json file
logRoutes.get('/log/list', (req, res) => {
  const logs = getLogData()
  res.send(logs)
})

module.exports = logRoutes
