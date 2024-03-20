const express = require('express');
const { registerUser, authUser, changePassword, getUsers, updateUser, registerClient } = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();
const {verifyUser} = require('../controllers/userController');
const {adminVerifyUser} = require('../controllers/userController'); 

router.route('/').post(registerUser).get(protect, getUsers);
router.route('/login').post(authUser);
router.route('/change-password').put(protect, changePassword);
router.route('/:id').put(protect, updateUser);
router.route('/verify/:userId').get(verifyUser, getUsers);
router.route('/admin-approve/:userId').get(adminVerifyUser);  
router.post('/register-client', registerClient);


module.exports = router;