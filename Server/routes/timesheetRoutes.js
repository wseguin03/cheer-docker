const express = require('express');
const {addTimeSheet, getTimeSheets, getTimeSheetById, updateTimeSheet, deleteTimeSheet} = require('../controllers/timesheetController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, addTimeSheet)
    .get(protect, getTimeSheets);

router.route('/:id')
    .get(protect, getTimeSheetById)
    .put(protect, updateTimeSheet)
    .delete(protect, deleteTimeSheet);

module.exports = router;