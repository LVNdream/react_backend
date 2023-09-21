const payModel = require("../../models/reactModel/payModel");
const productModel = require("../../models/reactModel/productsModel");

class payController {
  // them don hang vao database
  async addOrder(req, res) {
    // console.log(req.body)
    const itemsInCart = req.body.itemInCart;

    // Tạo biến để kiểm tra xem các sản phẩm có đủ số lượng không
    let checkQuantity = true;
    for (let i = 0; i < itemsInCart.length; i++) {
      const itemCheck = await productModel.returnItemToCheckQuantity(
        itemsInCart[i].id_product,
        itemsInCart[i].color,
        itemsInCart[i].size
      );
      if (itemCheck[0].quantity_product - itemsInCart[i].quantity >= 0) {
        checkQuantity = true;
      } else {
        checkQuantity = false;
        break;
      }
    }
    // console.log(checkQuantity);

    // Kiểm tra số lượng có phù hợp hay không để thêm hóa đơn vào giỏ hàng

    if (checkQuantity) {
      const entityOrder = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        recive: req.body.recive,
        adress: req.body.adress,
        paymethod_order: req.body.paymethod_order,
        note_order: req.body.note_order,
        total_money_order: req.body.total_money_order,
        status_order: req.body.status,
      };
      // Thêm vào hóa đơn vào database

      const addorder = await payModel.addOrder(entityOrder);

      const AllOrder = await payModel.returnAllOrder();

      //  cap nhat lai so luong san pham va them san pham vao bang chi tiet san pham

      for (let i = 0; i < itemsInCart.length; i++) {
        const itemUpdate = await productModel.returnItemToCheckQuantity(
          itemsInCart[i].id_product,
          itemsInCart[i].color,
          itemsInCart[i].size
        );
        const entityUpdateQuantity = {
          id_product: itemsInCart[i].id_product,
          color: itemsInCart[i].color,
          id_size: itemsInCart[i].size,
          quantity_product:
            itemUpdate[0].quantity_product - itemsInCart[i].quantity,
        };

        console.log(entityUpdateQuantity);
        const resultUpdated = await productModel.updateQuanlityProduct(
          entityUpdateQuantity
        );

        const entityOrderDetail = {
          id_order: AllOrder[AllOrder.length - 1].id_order,
          id_product: itemsInCart[i].id_product,
          quantity: itemsInCart[i].quantity,
          size: itemsInCart[i].size,
          color: itemsInCart[i].color,
          price_temp: itemsInCart[i].price_product,
        };
        //console.log(chitiethdOJ);
        const resutAddOrderDetail = await payModel.addOrderDetail(
          entityOrderDetail
        );
      }
      return res.send("Ban da dat hang thanh cong!!!");
      // res.render("pay", {
      //   announce: "Đơn hàng đã được đặt",
      // });
    }
  }
}
module.exports = new payController();
