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
  "/admin/updateproductquantity",
  adminController.updateProductQuantity
);
router.post(
  "/admin/addproduct",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.addProduct
);

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
