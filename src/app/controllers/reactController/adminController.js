const adminModel = require("../../models/reactModel/adminModel");
const productsModel = require("../../models/reactModel/productsModel");
class adminController {
  async getAllOrder(req, res) {
    console.log(12312312);
    // console.log(req.body.email_user);
    let allOrder = [];
    let issetHD;
    const orders = await adminModel.allOrder();
    //console.log(order);
    if (orders != null) {
      issetHD = true;

      for (let i = 0; i < orders.length; i++) {
        allOrder[i] = {
          listItem: await adminModel.selectOrder_detail(orders[i].id_order),
          id_order: orders[i].id_order,
          fullname: orders[i].fullname,
          date_order: orders[i].date_order,
          adress: orders[i].adress,
          recvie: orders[i].recvie,
          status_order: orders[i].status_order,
          total_money_order: orders[i].total_money_order,
          phone: orders[i].phone,
        };
      }
    } else {
      issetHD = false;
    }
    res.send({ allOrder, issetHD });
  }

  async updateStatus(req, res) {
    console.log(req.body);
    const kq = await adminModel.updateStatusOrder(req.body);
  }

  async updateProductQuantity(req, res) {
    // console.log("da vao duoc controller");

    // console.log(req.body);
    const kq = await adminModel.updateProductQuantity(req.body);
  }

  async addProduct(req, res) {
    // console.log(req.body);

    try {
      const entityProduct = {
        picture_product: req.body.pictureProduct,
        name_product: req.body.nameProduct,
        price_product: req.body.priceProduct,
        type_product: req.body.typeProduct,
        caterogy_product: req.body.caterogyProduct,
      };
      // console.log(entityProduct);

      let result1 = await adminModel.addProduct(entityProduct);
      const rowsSP = await productsModel.returnProductDesc();
      // // console.log(rowsSP);

      for (let i = 0; i < req.body.dataColor.length; i++) {
        const colorEntity = req.body.dataColor[i];
        const entityProductDetail = {
          id_product: rowsSP[0].id_product,
          id_size: colorEntity.id_size,
          color: colorEntity.color,
          quantity_product: colorEntity.quantity_product,
          id_color: null,
        };
        //console.log(chitiethdOJ);
        let kq2 = await adminModel.addProductDetail(entityProductDetail);
      }

      // // const resultSave = await usersModel.addAccount(entity);
      // // res.redirect('/fashion/menfashion');

      return res.send({error:true, mess:"da them thanh cong"});
    } catch (error) {
      console.log(error);
      return res.send({error:true,mess:"error add product"})
    }
  }

  async getTypeProduct(req, res) {
    const type_product = await adminModel.getTypeProduct();
    return res.send(type_product);
  }
  async getCaterogyProduct(req, res) {
    const caterogy_product = await adminModel.getCaterogyProduct(
      req.body.type_product
    );
    return res.send(caterogy_product);
  }
}
module.exports = new adminController();
