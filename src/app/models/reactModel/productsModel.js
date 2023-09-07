const db = require("../../../utilities/db");
// const TBL_ListFavorite = 'listfavorite';
const TBL_product = "products";
const TBL_productdetail = "productdetail";

// const TBL_nhanxet = 'nhanxet';
// const TBL_NXpicture = 'imgnhanxet';
module.exports = {
  returnProduct: function () {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT * from ${TBL_product}`);
  },
  returnProductByCaterogy: function (caterogy) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT * from ${TBL_product} where caterogy_product="${caterogy}"`);
  },
  // return ve mau sac cua san pham
  returnProductDetail: function (id_product) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT * from ${TBL_productdetail} where id_product=${id_product}`);
  },
  returnProductListColor: function (id_product) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT DISTINCT color from ${TBL_productdetail} where id_product=${id_product}`);
  },

  // reutrn ve chi tiet cua san pham
  returnItemDetail: function (id_product,caterogy,type) {
    // console.log("asdsa", db.load(`SELECT * from ${TBL_product}`));
    return db.load(`SELECT * from ${TBL_product} where id_product=${id_product} and caterogy_product="${caterogy}" and type_product="${type}"`);
  },




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
