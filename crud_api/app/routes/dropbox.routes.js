module.exports = (app) => {
    const logs = require('../controllers/dropbox.controller.js');

    // Create a new Log
    app.post('/logs', logs.create);

    // Retrieve all Logs
    app.get('/logs', logs.findAll);

    // Retrieve a single Log with logId
    app.get('/logs/:logId', logs.findOne);

    // Update a Log with logId
    app.put('/logs/:logId', logs.update);

    // Delete a Log with logId
    app.delete('/logs/:logId', logs.delete);
}
