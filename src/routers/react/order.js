const express = require('express');

const router = express.Router();

const orderController= require('../../app/controllers/reactController/orderController')
const middlewareAuth= require('../../app/controllers/reactController/middlewareAuth')



router.post('/clientgetorder',middlewareAuth.verifyToken,orderController.clientGetOrder);







module.exports = router;