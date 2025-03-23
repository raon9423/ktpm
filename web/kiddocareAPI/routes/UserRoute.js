const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');


// Route tìm kiếm giáo viên
router.get('/search-teacher', userController.searchTeachers);
// Route cho người dùng
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
// Lấy user theo username 
// router.get('/username/:username', userController.getUserByUsername);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
