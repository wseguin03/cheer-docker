const express = require('express');
const {addTimeSheet} = require('../controllers/timesheetController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/').post(addTimeSheet, protect)

module.exports = router