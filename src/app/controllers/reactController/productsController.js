const productsModel = require("../../models/reactModel/productsModel");
const clientModel = require("../../models/reactModel/clientModel");

class productsController {
  async getProducts(req, res) {
    //const rowPDCT = await menfsModel.returnProduct();

    const products = await productsModel.returnProduct();

    const productdeleted = await productsModel.returnProductDeleted();

    // const listFavoriteProduct = await clientModel.returnAllFavorite();

    // console.log(listFavoriteProduct)

    let productFilter = products;
    productdeleted.forEach((productDeleted, index) => {
      productFilter = productFilter.filter((product) => {
        return productDeleted.id_product_deleted != product.id_product;
      });
    });

    // console.log("123123123",productFilter);

    let productsdetail = [];
    for (let i = 0; i < productFilter.length; i++) {
      let isFavorite = false;
      const product = productFilter[i];
      // listFavoriteProduct.forEach((element, index) => {
      //   if (product.id_product == element.id_product) {
      //     isFavorite = true;
      //   }
      // });
      // console.log(isFavorite)
      const newproduct = {
        ...product,
        listColorDetail: await productsModel.returnProductDetail(
          product.id_product
        ),
        listColor: await productsModel.returnProductListColor(
          product.id_product
        ),
        listSize: await productsModel.returnProductListSize(product.id_product),
        isFavorite,
      };
      productsdetail.push(newproduct);
    }
    // console.log(productsdetail)
    return res.send(productsdetail);
  }

  async getProductsByCaterogy(req, res) {
    //const rowPDCT = await menfsModel.returnProduct();
    // console.log(req.params);

    const products = await productsModel.returnProductByCaterogy(
      req.params.caterogy
    );
    // const listFavoriteProduct = await clientModel.returnAllFavorite();

    let productsdetail = [];
    for (let i = 0; i < products.length; i++) {
      let isFavorite = false;
      const product = products[i];
      // listFavoriteProduct.forEach((element, index) => {
      //   if (product.id_product == element.id_product) {
      //     isFavorite = true;
      //   }
      // });
      const newproduct = {
        ...product,
        listColorDetail: await productsModel.returnProductDetail(
          product.id_product
        ),
        listColor: await productsModel.returnProductListColor(
          product.id_product
        ),
        listSize: await productsModel.returnProductListSize(product.id_product),
        isFavorite,
      };
      productsdetail.push(newproduct);
    }

    // console.log(productsdetail.listSize)

    return res.send(productsdetail);
  }

  async getProductsDetail(req, res) {
    // console.log(req.params);

    let inforDetail;
    const row = await productsModel.returnItemDetail(
      req.params.id,
      req.params.caterogy,
      req.params.type
    );
    let isFavorite = false;
    // const listFavoriteProduct = await clientModel.returnAllFavorite();

    let itemDeleted = false;
    const productdeleted = await productsModel.returnProductDeleted();
    productdeleted.forEach((product_deleted, index) => {
      if (product_deleted.id_product_deleted === row[0].id_product) {
        itemDeleted = true;
      }
    });

    // console.log(itemDeleted)

    if (row[0] && !itemDeleted) {
      // listFavoriteProduct.forEach((element, index) => {
      //   if (row[0].id_product == element.id_product) {
      //     isFavorite = true;
      //   }
      // });

      inforDetail = {
        ...row[0],
        listColorDetail: await productsModel.returnProductDetail(
          row[0].id_product
        ),
        listColor: await productsModel.returnProductListColor(
          row[0].id_product
        ),
        listSize: await productsModel.returnProductListSize(row[0].id_product),
        isFavorite,
      };
    }

    // console.log(inforDetail);
    return res.send(inforDetail);
  }
}
module.exports = new productsController();
