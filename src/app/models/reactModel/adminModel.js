const db = require("../../../utilities/db");
const TBL_ORDERS = "orders";
const TBL_CTHD = "order_detail ";
const TBL_PRODUCT = "products";
const TBL_PRODUCT_DELETED = "product_deleted";

const TBL_PRODUCT_DETAIL = "productdetail";
const TBL_CATEROGY = "caterogy_product";

module.exports = {
  orderByEmail: async function (email) {
    const rowOrder = await db.load(
      `select * from ${TBL_ORDERS} where email = '${email}' order by date_order desc`
    );
    if (rowOrder.length === 0) {
      return null;
    }
    return rowOrder;
  },

  allOrder: async function () {
    const rowOrder = await db.load(
      `select * from ${TBL_ORDERS} order by date_order desc`
    );
    if (rowOrder.length === 0) {
      return null;
    }
    return rowOrder;
  },

  selectOrder_detail: async function (id_order) {
    const rowOrder_detail = await db.load(
      `select ${TBL_CTHD}.id_product,picture_product,name_product,price_product,quantity,size,color,price_temp from ${TBL_CTHD},${TBL_PRODUCT} where ${TBL_CTHD}.id_product=${TBL_PRODUCT}.id_product and ${TBL_CTHD}.id_order = '${id_order}'`
    );
    if (rowOrder_detail.length === 0) {
      return null;
    }
    return rowOrder_detail;
  },

  // get type_product

  getTypeProduct: async function () {
    const rowType = await db.load(
      `select DISTINCT type_product from ${TBL_CATEROGY}`
    );
    if (rowType.length === 0) {
      return null;
    }
    return rowType;
  },

  // get_caterogy_product

  getCaterogyProduct: async function (type_product) {
    const rowCaterogy = await db.load(
      `select caterogy_product from ${TBL_CATEROGY} where type_product="${type_product}"`
    );
    if (rowCaterogy.length === 0) {
      return null;
    }
    return rowCaterogy;
  },

  updateStatusOrder: async function (entity) {
    const condition = {
      id_order: entity.id_order,
      email: entity.email,
    };
    delete entity.id_order;
    delete entity.email;

    return db.updateHD(TBL_ORDERS, entity, condition);
  },

  updateProductQuantity: async function (entity) {
    const condition = {
      id_product: entity.id_product,
      color: entity.color,
      id_size: entity.id_size,
    };
    delete entity.id_product;
    delete entity.color;
    delete entity.id_size;
    return db.updateQuantity(TBL_PRODUCT_DETAIL, entity, condition);
  },

  updateProductInfor: async function (entity) {
    const condition = {
      id_product: entity.id_product,
    };
    delete entity.id_product;
    return db.updateInforDetailProduct(TBL_PRODUCT, entity, condition);
  },

  addProduct: function (entity) {
    return db.add(TBL_PRODUCT, entity);
  },

  addProductDeleted: function (entity) {
    return db.add(TBL_PRODUCT_DELETED, entity);
  },

  addProductDetail: function (entity) {
    return db.add(TBL_PRODUCT_DETAIL, entity);
  },

  // ////////////////////

  deleteHD: function (entity) {
    return db.delete(TBL_ORDERS, entity);
  },
  // getOrderByDate
  getOrderbyFilterDate: async function (startday, endday) {
    const rowsOrder = await db.load(
      `select *,count(date_order) as total_order from ${TBL_ORDERS} where date_order>="${startday}" and date_order <="${endday}" group by date_order`
    );
    if (rowsOrder.length === 0) {
      return null;
    }
    return rowsOrder;
  },
  // filter
  getOrderbyFilterDateByEmail: async function (startday, endday, email) {
    const rowsOrder = await db.load(
      `select *,count(date_order) as total_order from ${TBL_ORDERS} where email="${email}" and date_order>="${startday}" and date_order <="${endday}" group by date_order`
    );
    if (rowsOrder.length === 0) {
      return [];
    }
    return rowsOrder;
  },
  getOrderbyFilterDateByTypeOrder: async function (
    startday,
    endday,
    status_order
  ) {
    const rowsOrder = await db.load(
      `select *,count(date_order) as total_order from ${TBL_ORDERS} where status_order="${status_order}" and date_order>="${startday}" and date_order <="${endday}" group by date_order`
    );
    if (rowsOrder.length === 0) {
      return [];
    }
    return rowsOrder;
  },
  getOrderbyFilterDateByTypeOrderAndEmail: async function (
    startday,
    endday,
    email,
    status_order
  ) {
    const rowsOrder = await db.load(
      `select *,count(date_order) as total_order from ${TBL_ORDERS} where status_order="${status_order}" and email="${email}" and date_order>="${startday}" and date_order <="${endday}" group by date_order`
    );
    if (rowsOrder.length === 0) {
      return [];
    }
    return rowsOrder;
  },
};
