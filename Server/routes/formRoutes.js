const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const {protect} = require('../middleware/authMiddleware');

router.post('/forms', formController.createForm);
router.get('/forms', formController.getForms);
router.patch('/forms/:id/visibility', formController.toggleFormVisibility);
router.put('/forms/:id', formController.updateForm);
router.delete('/forms/:id', formController.deleteForm);


module.exports = router;