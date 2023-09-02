const express = require('express');

const router = express.Router();
const productsController = require("../../app/controllers/reactController/productsController")



router.get('/men',productsController.getProducts);
router.get('/men/:caterogy',productsController.getProductsByCaterogy);


module.exports = router;