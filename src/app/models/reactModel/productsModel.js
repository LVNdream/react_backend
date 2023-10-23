const db = require("../../../utilities/db");
// const TBL_ListFavorite = 'listfavorite';
const TBL_product = "products";
const TBL_productdetail = "productdetail";
const TBL_productdeleted = "product_deleted";

const TBL_COMMENTS = "comments";
const TBL_COMMENTS_IMAGE = 'comments_image';
module.exports = {
  returnProduct: function () {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT * from ${TBL_product}`);
  },
  returnProductById: function (id_product) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(
      `SELECT * from ${TBL_product} where id_product = ${id_product}`
    );
  },
  returnProductDeleted: function () {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT * from ${TBL_productdeleted}`);
  },
  returnProductDesc: function () {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT * from ${TBL_product} order by id_product desc`);
  },
  returnProductByCaterogy: function (caterogy) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(
      `SELECT * from ${TBL_product} where caterogy_product="${caterogy}"`
    );
  },
  // return ve mau sac cua san pham
  returnProductDetail: function (id_product) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(
      `SELECT * from ${TBL_productdetail} where id_product=${id_product}`
    );
  },
  returnProductListColor: function (id_product) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(
      `SELECT DISTINCT color from ${TBL_productdetail} where id_product=${id_product}`
    );
  },

  returnProductListSize: function (id_product) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(
      `SELECT DISTINCT id_size from ${TBL_productdetail} where id_product=${id_product}`
    );
  },

  // reutrn ve chi tiet cua san pham
  returnItemDetail: function (id_product, caterogy, type) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(
      `SELECT * from ${TBL_product} where id_product=${id_product} and caterogy_product="${caterogy}" and type_product="${type}"`
    );
  },
  returnItemToCheckQuantity: function (id_product, color, size) {
    return db.load(
      `SELECT * from ${TBL_productdetail} where id_product=${id_product} and color="${color}" and id_size="${size}"`
    );
  },
  updateQuanlityProduct: async function (entity) {
    const condition = {
      id_product: entity.id_product,
      color: entity.color,
      id_size: entity.id_size,
    };
    delete entity.id_product;
    delete entity.id_size;
    delete entity.color;
    // console.log(condition,entity)

    return db.updateQuantity(TBL_productdetail, entity, condition);
  },

  returnCmt_By_Id_product: function (id_product) {
    return db.load(
      `SELECT * from ${TBL_COMMENTS} where id_product='${id_product}'`
    );
  },

  returnIMG_By_Id_content: function (id_content) {
    return db.load(
      `SELECT * from ${TBL_COMMENTS_IMAGE} where id_content = '${id_content}'`
    );
  },
  // ///////
  //
  //
  // returnProductByName: function (tensp) {
  //     return db.load(`SELECT * from ${TBL_product} where tensp like '%${tensp}%'`);
  // },
  // returnProductById: async function (masp) {
  //     const rowPD = await db.load(`select * from ${TBL_product} where masp = '${masp}'`);
  //     if (rowPD.length === 0) {
  //         return null;
  //     }
  //     return rowPD[0];
  // },
  // returnCtProduct: function (masp) {
  //     return db.load(`SELECT * from chitietsp where masp = '${masp}'`);
  // },
  // returnAllFavorite: function () {
  //     return db.load('SELECT * from listfavorite');
  // },
  // addFavorite: async function (entity) {
  //     return db.add(TBL_ListFavorite,entity);
  // },
  // //hàm thêm nội dung cmt vào database
  // addNhanxet: async function (entity) {
  //     return db.add(TBL_nhanxet,entity);
  // },
  // addNXpicture: async function (entity) {
  //     return db.add(TBL_NXpicture,entity);
  // },
  // returnNX: function () {
  //     return db.load(`SELECT * from ${TBL_nhanxet}`);
  // },
  // returnNX_by_masp: function (masp) {
  //     return db.load(`SELECT * from ${TBL_nhanxet} where masp='${masp}'`);
  // },
  // returnIMG_By_idcontent: function (idcontent) {
  //     return db.load(`SELECT * from ${TBL_NXpicture} where idcontent = '${idcontent}'`);
  // },
};
