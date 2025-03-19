import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userID: { type: String, required: true }, 
  items: { type: Array, required: true }, 
  amount: { type: Number, required: true }, 
  address: { type: Object, required: true }, 
  date: { type: Number, required: true } 
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
