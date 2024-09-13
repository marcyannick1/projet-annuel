const express = require('express');
const router = express.Router();
const multer = require('multer');
const {uploadFiles, deleteFiles, getAllfiles, getFilesByUser} = require('../controllers/file');

const upload = multer().array("files");

router.post('/', upload, uploadFiles);
router.delete('/', deleteFiles);
router.get('/', getAllfiles);
router.get('/:id', getFilesByUser);

module.exports = router;