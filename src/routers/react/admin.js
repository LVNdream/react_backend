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
router.post(
  "/admin/getorderfilterbydate",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate
);

// filter theo ngay //////////
router.post(
  "/admin/getorderfilterbydate/email",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Email
);
router.post(
  "/admin/getorderfilterbydate/typeorder",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_TypeOrder
);
router.post(
  "/admin/getorderfilterbydate/typeorderandemail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_TypeOrder_Email
);

// filter theo năm
router.post(
  "/admin/getorderfilterbydate/year",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterBy_Year
);

router.post(
  "/admin/getorderfilterbydate/yearemail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Year_Email
);
router.post(
  "/admin/getorderfilterbydate/yeartypeorder",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Year_TypeOrder
);
router.post(
  "/admin/getorderfilterbydate/yeartypeorderandemail",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.getOrderFilterByDate_Year_TypeOrder_Email
);
//  thống kê doanh thu theo date
router.post(
  "/admin/revenue/date",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.revenueByDate
);
router.post(
  "/admin/revenue/year",
  middlewareAuth.verifyToKenAdminAuth,
  adminController.revenueByYear
);
module.exports = router;
