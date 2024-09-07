const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadFiles, deleteFiles} = require('../controllers/file');

const upload = multer().array("files");

router.post('/', upload, uploadFiles);
router.delete('/', deleteFiles);

module.exports = router;