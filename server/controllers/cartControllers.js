import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { email, productID, quantity } = req.body

    const userData = await User.findOne({ email })
    if (!userData) {
      res.json({success: false, message: 'Người dùng ko tồn tại!'})
    }
    
    const existingItem = userData.cartData.find(item => item.productID === productID)
    if (existingItem) {
      existingItem.quantity += quantity || 1
    }
    else {
      userData.cartData.push({productID, quantity: 1})
    }

    await userData.save()

    res.json({success: true, message: 'Thêm vào giỏ hàng thành công!'})

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
};

const updateCart = async (req, res) => {
  try {
    const { email, productID, quantity } = req.body

    const userData = await User.findOne({ email })
    if (!userData) {
      res.json({success: false, message: 'Người dùng ko tồn tại!'})
    }
    
    const existingItem = userData.cartData.find(item => item.productID === productID)
    if (!existingItem) {
      res.json({success: false, message: 'Sản phẩm không tồn tại trong giỏ hàng!'})
    }
    
    existingItem.quantity = quantity

    await userData.save()

    res.json({success: true, message: 'Cập nhật giỏ hàng thành công!'})

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
};

const getUserCart = async (req, res) => {
  try {
    const { email } = req.body
    const userData = await User.findOne({ email })
    if (!userData) {
      res.json({success: false, message: 'Người dùng ko tồn tại!'})
    }
  
    res.json({success: true, cartData: userData.cartData})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
  }
};

export { addToCart, updateCart, getUserCart };
