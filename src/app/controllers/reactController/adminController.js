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
          email: orders[i].email,
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
    try {
      // console.log(req.body);
      const entityUpdate = {
        email: req.body.inforUpdate.email,
        id_order: req.body.inforUpdate.id_order,
        status_order: req.body.inforUpdate.status_order,
      };
      // console.log(entityUpdate)
      const kq = await adminModel.updateStatusOrder(entityUpdate);
      return res.send("Update Status Success");
    } catch (error) {
      console.log(error);
      return res.send("Update Status Error");
    }
  }

  async updateProductQuantity(req, res) {
    // console.log("da vao duoc controller");
    let isError;
    console.log(req.body);
    const entityUpdate = {
      id_product: req.body.inforUpdate.id_product,
      id_size: req.body.inforUpdate.id_size,
      color: req.body.inforUpdate.color,
      quantity_product: req.body.inforUpdate.quantity_product,
    };
    // console.log(entityUpdate);

    try {
      const kq = await adminModel.updateProductQuantity(entityUpdate);
      isError = false;
    } catch (error) {
      console.log(error);
      isError = true;
    }
    if (isError) {
      return res.send({ mess: "Error Update", isError });
    } else {
      return res.send({ mess: "Update Succsess", isError });
    }
  }

  //

  //
  //
  //
  async updateProductInfor(req, res) {
    // console.log(req.body.inforProduct);
    let isError;

    try {
      const kq = await adminModel.updateProductInfor(req.body.inforProduct);
      isError = false;
    } catch (error) {
      console.log(error);
      isError = true;
    }
    if (isError) {
      return res.send({ mess: "Error Update", isError });
    } else {
      return res.send({ mess: "Update Succsess", isError });
    }
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

      return res.send({ error: false, mess: "da them thanh cong" });
    } catch (error) {
      console.log(error);
      return res.send({ error: true, mess: "error delete product" });
    }
  }

  async addProductDelete(req, res) {
    console.log(req.body);

    try {
      let result1 = await adminModel.addProductDeleted(req.body.inforProduct);

      return res.send({ error: false, mess: "da xoa thanh cong" });
    } catch (error) {
      console.log(error);
      return res.send({ error: true, mess: "error add product" });
    }
  }

  async getProductDelete(req, res) {
    const productDeleted = await productsModel.returnProductDeleted();
    return res.send(productDeleted);
  }

  async addProductDetail(req, res) {
    // console.log(req.body)
    let isError;
    try {
      for (let i = 0; i < req.body.inforProduct.length; i++) {
        const colorEntity = req.body.inforProduct[i];
        const entityProductDetail = {
          id_product: colorEntity.id_product,
          id_size: colorEntity.id_size,
          color: colorEntity.color,
          quantity_product: colorEntity.quantity_product,
          id_color: null,
        };
        // console.log(entityProductDetail);
        let kq2 = await adminModel.addProductDetail(entityProductDetail);
        isError = false;
      }
    } catch (error) {
      console.log(error);
      isError = true;
    }
    if (isError) {
      return res.send({ isError, mess: "Error productdetail" });
    } else {
      return res.send({ isError, mess: "Add productdetail success" });
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

  async getOrderFilterByDate(req, res) {
    console.log(req.body);

    return res.send("123123");
  }
}
module.exports = new adminController();
