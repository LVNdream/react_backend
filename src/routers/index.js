const homeRouter = require("./home");
const fashionRouter = require("./fashionmen");
const accountRouter = require("./account");
const cartRouter = require("./cart");
const payRouter = require("./pay");
const admin = require("./admin");

// ////////
const products = require("./react/products");
const pay = require("./react/pay");
const authentication = require("./react/authentication");
const adminReact = require("./react/admin");
const orderReact = require("./react/order");
const client = require("./react/client");




function router(app) {
  app.use("/products", products);
  app.use("/payment", pay);
  app.use("/auth",authentication);
  app.use("/",adminReact);
  app.use("/order",orderReact);
  app.use("/client",client);





  // //////////////////////////////////////////////

  app.use("/home", homeRouter);

  app.use("/fashion", fashionRouter);

  app.use("/account", accountRouter);

  app.use("/", cartRouter);
  app.use("/", payRouter);
  app.use("/admin", admin);
}

module.exports = router;
