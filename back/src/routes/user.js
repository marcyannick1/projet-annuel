const express = require('express');
const router = express.Router();
const {editUser, deleteUser} = require("../controllers/user");

router.put('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router;