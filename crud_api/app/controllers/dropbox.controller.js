const Log = require('../models/dropbox.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Log name cannot be empty"
        });
    }

    // Create a Log
    const log = new Log({
        name: req.body.name || "Untitled Log",
        path_lower: req.body.path_lower, 
        path_display: req.body.path_display,
        id: req.body.id, 
        client_modified: req.body.client_modified, 
        server_modified: req.body.server_modified,
        rev: req.body.rev, 
        size: req.body.size,
        is_downloadable: req.body.is_downloadable,
        content_hash: req.body.content_hash
    });

    // Save Log in the database
    log.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Log."
        });
    });
};

// Retrieve and return all logs from the database.
exports.findAll = (req, res) => {
    Log.find()
    .then(logs => {
        res.send(logs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving logs."
        });
    });
};

// Find a single log with a logId
exports.findOne = (req, res) => {
    Log.findById(req.params.logId)
    .then(log => {
        if(!log) {
            return res.status(404).send({
                message: "Log not found with id " + req.params.logId
            });            
        }
        res.send(log);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Log not found with id " + req.params.logId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving log with id " + req.params.logId
        });
    });
};

// Update a log identified by the logId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Log name cannot be empty"
        });
    }

    // Find log and update it with the request body
    Log.findByIdAndUpdate(req.params.logId, {
        name: req.body.name || "Untitled Log",
        path_lower: req.body.path_lower, 
        path_display: req.body.path_display,
        id: req.body.id, 
        client_modified: req.body.client_modified, 
        server_modified: req.body.server_modified,
        rev: req.body.rev, 
        size: req.body.size,
        is_downloadable: req.body.is_downloadable,
        content_hash: req.body.content_hash
    })
    .then(log => {
        if(!log) {
            return res.status(404).send({
                message: "Log not found with id " + req.params.logId
            });
        }
        res.send(log);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Log not found with id " + req.params.logId
            });                
        }
        return res.status(500).send({
            message: "Error updating log with id " + req.params.logId
        });
    });
};

// Delete a log with the specified logId in the request
exports.delete = (req, res) => {
    Log.findByIdAndRemove(req.params.logId)
    .then(log => {
        if(!log) {
            return res.status(404).send({
                message: "Log not found with id " + req.params.logId
            });
        }
        res.send({message: "Log deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Log not found with id " + req.params.logId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Log with id " + req.params.logId
        });
    });
};
