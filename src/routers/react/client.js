const express = require("express");

const router = express.Router();

const clientController = require("../../app/controllers/reactController/clientController");
const middlewareAuth = require("../../app/controllers/reactController/middlewareAuth");

router.post(
  "/addfavorite",
  middlewareAuth.verifyToken,
  clientController.addFavoriteProduct
);
router.post(
  "/getfavorite",
  middlewareAuth.verifyToken,
  clientController.getListFavoriteProduct
);

router.post(
  "/deletefavorite",
  middlewareAuth.verifyToken,
  clientController.deleteFavoriteProduct
);

router.post(
    "/deleteallfavorite",
    middlewareAuth.verifyToken,
    clientController.deleteAllFavoriteProduct
  );

module.exports = router;
