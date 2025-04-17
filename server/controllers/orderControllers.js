import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";


// Hàm tạo mã đơn hàng
const generateOrderCode = () => {
  const date = new Date();
  const yyyymmdd = date.toISOString().split("T")[0].replace(/-/g, "");
  const randomNum = Math.floor(Math.random() * 900 + 100); //3số ngẫu nhiên
  return `KDU-${yyyymmdd}-${randomNum}`;
};

// Tăng tính bảo mật => Lấy đơn hàng theo userID từ token xác thực – an toàn, bảo mật hơn.
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

// sử dụng thông tin người dùng từ token JWT đã được xác thực trước đó để lấy dữ liệu
const placeOrder = async (req, res) => {
  try {
    const { items, address, amount } = req.body;
    const userID = req.user.id; // Lấy từ token

    const orderData = {
      userID, 
      code: generateOrderCode(),
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


// sử dụng email để tìm người dùng trong cơ sở dữ liệu => kém bảo mật
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
