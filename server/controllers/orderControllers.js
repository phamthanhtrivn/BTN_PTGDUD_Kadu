import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";

// const userOrders = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const userData = await User.findOne({ email });
//     const orders = await orderModel.find({ userID: userData._id });
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
const userOrders = async (req, res) => {
  try {
    const userID = req.user.id;
    const orders = await orderModel.find({ userID });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { items, address, amount } = req.body;
    const userID = req.user.id; // Lấy từ token

    const orderData = {
      userID, 
      items,
      address,
      amount,
      date: Date.now()
    };
  
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Xóa giỏ hàng người dùng
    await User.findByIdAndUpdate(userID, { cartData: [] });

    res.json({ success: true, message: "Đặt hàng thành công!", orderID: newOrder._id });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// const placeOrder = async (req, res) => {
//   try {
//     const { email, items, address, amount } = req.body

//     const userData = await User.findOne({ email })
//     const userID = userData._id
  
//     const orderData = {
//       userID, 
//       items,
//       address,
//       amount,
//       date: Date.now()
//     }
  
//     const newOrder = new orderModel(orderData)
//     await newOrder.save()
  
//     await User.findOneAndUpdate({ email }, { cartData: []})
//     // res.json({ success: true, message: "Đặt hàng thành công!" });
//     res.json({ success: true, message: "Đặt hàng thành công!", orderID: newOrder._id });

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

export { userOrders, placeOrder };
