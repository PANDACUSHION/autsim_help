const express = require('express');
const userController = require('./controllers/userController.js');
const postController = require('./controllers/postController.js');
const appointmentController = require('./controllers/appointmentController.js');
const auth = require('./middleware/auth.js');
const upload = require('./middleware/multer.js');

const router = express.Router();

// POST routes with file upload for post creation
router.post('/create/post', upload.single('file'), auth.authenticate, auth.authorizeAdmin, postController.createPost);
router.post('/create/user', userController.createUser);
router.post('/create/appointment', auth.authenticate, appointmentController.createAppointment);

// GET routes
router.get('/get/appointments', auth.authenticate,auth.authorizeAdmin, appointmentController.getAllAppointments);
router.get('/get/users', userController.getAllUsers);
router.get('/get/posts', postController.getAllPosts);

// UPDATE route for appointment status
router.put('/update/appointment/:id/status',auth.authenticate, auth.authorizeAdmin, appointmentController.updateAppointment);

// DELETE routes
router.delete('/delete/appointments/:id',auth.authenticate, auth.authorizeAdmin, appointmentController.deleteAppointment);
router.delete('/delete/user/:id', auth.authenticate, auth.authorizeAdmin, userController.deleteUser);
router.delete('/delete/post/:id',auth.authenticate, auth.authorizeAdmin, postController.deletePost);

// Validate user
router.post('/get/user', userController.validateUser);

module.exports = router;