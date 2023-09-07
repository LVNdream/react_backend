const express = require('express');

const router = express.Router();
const productsController = require("../../app/controllers/reactController/productsController")



router.get('/men',productsController.getProducts);
router.get('/men/:caterogy',productsController.getProductsByCaterogy);
router.get('/:type/:caterogy/:id',productsController.getProductsDetail);



module.exports = router;