

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

}

module.exports = router;
