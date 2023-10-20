const express = require("express");

const router = express.Router();

const adminController = require("../../app/controllers/reactController/adminController");
const middlewareAuth = require("../../app/controllers/reactController/middlewareAuth");

router.post(
  "/admin/getorder",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getAllOrder
);
router.post("/admin/updatestatus", adminController.updateStatus);

router.post(
  "/admin/addproduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.addProduct
);
// /////////////////////////////
router.post(
  "/admin/updateproductquantity",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.updateProductQuantity
);
router.post(
  "/admin/addproduct/productdetail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.addProductDetail
);
router.post(
  "/admin/updateproduct/productdetail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.updateProductInfor
);
// ///////////////////////

router.post(
  "/admin/deletedroduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.addProductDelete
);
router.post(
  "/admin/getdeletedroduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getProductDelete
);
// ///////////////////////
router.post(
  "/admin/gettypeproduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getTypeProduct
);
router.post(
  "/admin/getcaterogyproduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getCaterogyProduct
);

module.exports = router;
