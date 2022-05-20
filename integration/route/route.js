// Route.js
const express = require('express')
const router = express.Router();
const fs = require('fs');
const logRoutes = require('./log') // import log route
router.use(logRoutes) // use log route
module.exports = router;

