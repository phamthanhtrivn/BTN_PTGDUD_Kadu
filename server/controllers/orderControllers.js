import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";

const userOrders = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });
    const orders = await orderModel.find({ userID: userData._id });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { email, items, address, amount } = req.body

    const userData = await User.findOne({ email })
    const userID = userData._id
  
    const orderData = {
      userID, 
      items,
      address,
      amount,
      date: Date.now()
    }
  
    const newOrder = new orderModel(orderData)
    await newOrder.save()
  
    await User.findOneAndUpdate({ email }, { cartData: []})
    res.json({ success: true, message: "Đặt hàng thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { userOrders, placeOrder };
