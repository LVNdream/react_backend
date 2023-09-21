const express = require('express');

const router = express.Router();

const adminController= require('../../app/controllers/reactController/adminController');
const middlewareAuth = require('../../app/controllers/reactController/middlewareAuth')


router.post('/admin/addorder',middlewareAuth.verifyToKenAdminAuth,adminController.addProduct);



module.exports = router;