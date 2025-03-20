import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { email, productID, quantity } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    const existingItem = user.cartData.find(item => item.productID === productID);

    if (existingItem) {
      await User.updateOne(
        { email, 'cartData.productID': productID },
        { $inc: { 'cartData.$.quantity': quantity } }
      );
    } else {
      await User.updateOne(
        { email },
        { $push: { cartData: { productID, quantity } } }
      );
    }

    const updatedUser = await User.findOne({ email });

    return res.json({
      success: true,
      message: "Thêm vào giỏ hàng thành công!",
      cartData: updatedUser.cartData
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};


const updateCart = async (req, res) => {
  try {
    const { email, productID, quantity } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email, "cartData.productID": productID },
      {
        $set: { "cartData.$.quantity": quantity },
      },
      { new: true } 
    );

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "Người dùng hoặc sản phẩm không tồn tại trong giỏ hàng!",
      });
    }

    return res.json({
      success: true,
      message: "Cập nhật giỏ hàng thành công!",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { email, productID } = req.body;

    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "Người dùng ko tồn tại!" });
    }

    userData.cartData = userData.cartData.filter((item) => {
      return item.productID !== productID;
    });

    await userData.save();
    return res.json({
      message: "Xóa sản phẩm khỏi giỏ hàng thành công!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const deleteAllCartItem = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await User.updateOne(
      { email },
      { $set: { cartData: [] } }
    );

    if (result.modifiedCount === 0) {
      return res.json({
        success: false,
        message: "Người dùng không tồn tại hoặc giỏ hàng đã trống!",
      });
    }

    return res.json({
      success: true,
      message: "Xóa toàn bộ sản phẩm khỏi giỏ hàng thành công!",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "Người dùng ko tồn tại!" });
    }

    return res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  addToCart,
  updateCart,
  getUserCart,
  deleteCartItem,
  deleteAllCartItem,
};
