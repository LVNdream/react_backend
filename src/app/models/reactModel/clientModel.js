const db = require("../../../utilities/db");
const TBL_LF = "listfavorite";
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
};
