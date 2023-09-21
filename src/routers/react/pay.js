const express = require('express');

const router = express.Router();
const payController = require("../../app/controllers//reactController/payController")



router.post('/addorder',payController.addOrder);




module.exports = router;