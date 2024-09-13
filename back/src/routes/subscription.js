const express = require('express');
const router = express.Router();
const {createSubscription, getAllSubscriptions, getUserSubscriptions} = require("../controllers/subscription");

router.post('/', createSubscription)
router.get('/', getAllSubscriptions)
router.get('/:userId', getUserSubscriptions)

module.exports = router;