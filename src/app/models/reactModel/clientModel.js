const db = require("../../../utilities/db");
const TBL_LF = "listfavorite";
const TBL_ORDER = "orders";
const TBL_COMMENTS = "comments";
const TBL_COMMENT_IMAGE = "comments_image";
module.exports = {
  returnAllFavorite: function () {
    return db.load(`SELECT * from ${TBL_LF}`);
  },
  disFavorite: async function (entity) {
    return db.add(TBL_LF, entity);
  },
  addFavoriteProduct: async function (entity) {
    return db.add(TBL_LF, entity);
  },
  deleteFavorite: async function (id_user, id_product) {
    return db.delete(TBL_LF, id_user, id_product);
  },

  deleteAllFavorite: async function (id_user) {
    return db.deleteAllFRV(TBL_LF, id_user);
  },
  returnAllFavoriteByUser: function (id_user) {
    return db.load(`SELECT * from ${TBL_LF} where id_user='${id_user}'`);
  },
  deleteOrder: function (email, id_order) {
    return db.deleteOrder(TBL_ORDER, email, id_order);
  },

  //
  addComment: async function (entity) {
    return db.add(TBL_COMMENTS, entity);
  },
  addComment_Picture: async function (entity) {
    return db.add(TBL_COMMENT_IMAGE, entity);
  },
  returnAllCmtById_user: async function (id_user) {
    return db.load(`SELECT * from ${TBL_COMMENTS} where id_user='${id_user}'`);;
  },
};
