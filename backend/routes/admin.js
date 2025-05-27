const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddlewares');

router.post('/register', authMiddleware, adminController.createAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/', authMiddleware, adminController.getAdmins);
router.delete('/:id', authMiddleware, adminController.deleteAdmin);


module.exports = router;
