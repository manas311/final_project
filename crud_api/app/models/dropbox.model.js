const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    name: String,
    path_lower: String, 
    path_display: String,
    fileid: String,
    client_modified: String, 
    server_modified: String,
    rev: String,
    size: {type:Number, min: 0, max: 100000000000000000000000},
    is_downloadable: Boolean,
    content_hash: String
});

module.exports = mongoose.model('Log', LogSchema);
