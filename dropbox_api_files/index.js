
console.log("In method");
var request = require('request');
var fs = require('fs');
var data_put;
//enter your access token
var access_token = "gp64_bAm_o0AAAAAAAAAAQLRrCDqV-faIFfG88bhajwcd3NoJyLLusYcQ35WcCHe";
//Name of the file to be uploaded
var filename = 'data.csv';
//reading the contents 
var content = fs.readFileSync(filename);

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

options = {
            method: "POST",
            url: 'https://content.dropboxapi.com/2/files/upload',
            headers: {
              "Content-Type": "application/octet-stream",
              "Authorization": "Bearer " + access_token,
              "Dropbox-API-Arg": "{\"path\": \"/uploaded_files/"+filename+"\",\"mode\": \"overwrite\",\"autorename\": true,\"mute\": false}",
            },
            body:content
};

/*
request(options,function(err, res,body){
     console.log("Err : " + err);
     console.log("res : " + res);
     console.log("body : " + body); 
})*/


//edited


request(options,function(err, res,body){
  console.log("Err : " + err);
  console.log("res : " + res);
  console.log("body : " + body);
  const b = JSON.parse(body);
  const m = new Meta (b);
  m.save();
  
  fs.writeFile("log.json", body, (err) => {
   if (err)
     console.log(err);
   else {
     console.log("File written successfully\n");
     console.log("The written has the following contents:");
     console.log(fs.readFileSync("log.json", "utf8"));
   }
 });
})
