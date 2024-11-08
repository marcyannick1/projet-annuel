const express = require('express');
const router = express.Router();
const {editUser, deleteUser, getAllUsers, getUserById, getAdminUsers} = require("../controllers/user");

router.put('/:id', editUser)
router.delete('/:id', deleteUser)
router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.get('/admin', getAdminUsers)

module.exports = router;