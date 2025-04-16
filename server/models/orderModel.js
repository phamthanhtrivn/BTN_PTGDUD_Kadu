import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userID: { type: String, required: true }, 
  items: { type: Array, required: true }, 
  amount: { type: Number, required: true }, 
  address: { type: Object, required: true }, 
  date: { type: Number, required: true } 
});

//quản lý sp trong đơn đã đặt_thêm
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
}, { _id: false });

//truy vấn các thông tin địa chỉ của đơn hàng_thêm
const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String },
  district: { type: String },
  postalCode: { type: String }
}, { _id: false });

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
