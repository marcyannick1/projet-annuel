const express = require('express');
const router = express.Router();
const {editUser, deleteUser, getAdminUsers} = require("../controllers/user");

router.put('/:id', editUser)
router.delete('/:id', deleteUser)
router.get('/admin', getAdminUsers)

module.exports = router;