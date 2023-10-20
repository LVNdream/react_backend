const clientModel = require("../../models/reactModel/clientModel");
const productsModel = require("../../models/reactModel/productsModel");

class clientController {
  //ham xoa yeu thich

  async addFavoriteProduct(req, res) {
    let isExsit = false;
    // console.log(req.body)
    try {
      const listfavorite = await clientModel.returnAllFavorite();
      // console.log(listfavorite);
      listfavorite.forEach((element) => {
        if (
          element.id_product == req.body.inforProductFVR.id_product &&
          element.id_user == req.body.inforProductFVR.id_user
        ) {
          isExsit = true;
          //   console.log("da trung");
          return res.send("favoriteProduct is existed");
        }
      });
      console.log(isExsit);
      if (!isExsit) {
        const entity = {
          id_user: req.body.inforProductFVR.id_user,
          id_product: req.body.inforProductFVR.id_product,
          favorite: true,
        };
        const addFVR = await clientModel.addFavoriteProduct(entity);
        return res.send("Add to favorite success");
      }
    } catch (error) {
      console.log(error);
      return res.send("Add to favorite error");
    }
  }
  async getListFavoriteProduct(req, res) {
    try {
      const listfavorite = await clientModel.returnAllFavoriteByUser(
        req.body.id_user
      );

      // console.log(listfavorite);
      const productdeleted = await productsModel.returnProductDeleted();

      let productFilter = listfavorite;
      productdeleted.forEach((productDeleted, index) => {
        productFilter = productFilter.filter((product) => {
          return productDeleted.id_product_deleted != product.id_product;
        });
      });

      let inforProduct = [];

      for (let index = 0; index < productFilter.length; index++) {
        const element = productFilter[index];
        const product = await productsModel.returnProductById(
          element.id_product
        );
        inforProduct.push(product[0]);
      }

      // console.log(inforProduct)
      return res.send(inforProduct);
    } catch (error) {
      console.log(error);
      return res.send("Get favorite error");
    }
  }

  async deleteFavoriteProduct(req, res) {
    try {
      // console.log(req.body);
      const deleted = await clientModel.deleteFavorite(
        req.body.id_user,
        req.body.id_product
      );

      return res.send("Deleted Favorite Success");
    } catch (error) {
      console.log(error);
      return res.send("Delete error");
    }
  }

  async deleteAllFavoriteProduct(req, res) {
    try {
      console.log("12312");
      console.log(req.body);
      const deleted = await clientModel.deleteAllFavorite(req.body.id_user);

      return res.send("Deleted All Favorite Success");
    } catch (error) {
      console.log(error);
      return res.send("Delete All error");
    }
  }
  async deleteOrder(req, res) {
    try {
      // console.log("12312");
      // console.log(req.body);
      const deleted = await clientModel.deleteOrder(
        req.body.inforDelete.email,
        req.body.inforDelete.id_order
      );

      return res.send({ mess: "Deleted Order Success", isError: false });
    } catch (error) {
      console.log(error);
      return res.send({ mess: "Delete Order error", isError: true });
    }
  }
}

module.exports = new clientController();
