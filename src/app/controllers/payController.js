
const payModel = require('../models/payModel');
const adModel = require('../models/adminModel');
const menfashionModel = require('../models/menfashionModel');

class payController {
  showpay(req, res) {
    res.render('pay');

  }
  async addPayInDB(req, res) {

    // Tạo biến kiểm tra số lượng trong kho 
    let testQuantity = true;

    // kiểm tra từng sản phẩm trong kho với id  màu sắc và size để xem số lượng có hợp lí không
    for (var index = 0; index < req.body.masp.length; index++) {
      const product = await menfashionModel.returnProductById(req.body.masp[index]);
      if (product.soluongsp - req.body.soluong[index] >= 0) {
        testQuantity = true;
      } else {
        testQuantity = false;
        break;
      }
    }

    // sau đo thêm thông tin khác hàng và thông tin hóa đơn vào bảng hóa đơn
    if (testQuantity) {
      const entityhd = {
        //idhd: req.body.sodienthoai + 24,
        hovaten: req.body.hovaten,
        email: req.body.email,
        sodienthoai: req.body.sodienthoai,
        nhanhang: req.body.nhanhang,
        diachichitiet: req.body.diachichitiet,
        tinh: req.body.tinh,
        quan: req.body.quan,
        phuong: req.body.phuong,
        thanhtoan: req.body.thanhtoan,
        ghichu: req.body.ghichu,
        tongtien: req.body.tongtien,
        trangthai: 'Chờ xác nhận'
      }

      // Thêm vào hóa đơn vào database
      //console.log(entity);
      await payModel.addPay(entityhd);
      //console.log(req.body);


      // Lẩy ra tất cả các hóa đơn có trong database
      const rowsHD = await payModel.returnPay();

      // Thêm chi tiết từng sản phẩm vào hóa đơn cuối cùng là hóa đơn mới nhất vừa được thêm vào
      // Đầu tiên là cập nhật lại số lượng của từng sản phẩm
      // Sau đó thêm vào chi tiết hóa đơn
      //console.log(rowsHD);
      for (var i = 0; i < req.body.masp.length; i++) {
        const productUpdate = await menfashionModel.returnProductById(req.body.masp[i]);
        const entity = {
          masp: req.body.masp[i],
          soluongsp: productUpdate.soluongsp - req.body.soluong[i]
        };
        const updateQuantity = await adModel.updateQuanlityProduct(entity);
        const chitiethdOJ = {
          idhd: rowsHD[rowsHD.length - 1].idhd,
          masp: req.body.masp[i],
          soluong: req.body.soluong[i],
          size: req.body.size[i],
          color: req.body.color[i],
        }
        //console.log(chitiethdOJ);
        await payModel.addChitiethd(chitiethdOJ);
      }
      // res.send('123');
      res.render('pay', {
        announce: 'Đơn hàng đã được đặt',
      });
    }
    else {
      res.render('pay', {
        announceError: 'Có lỗi với số lượng sản phẩm',
      });
    }


  }

}
module.exports = new payController();