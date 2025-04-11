// import express from 'express'
// import { addToCart, getUserCart, updateCart, deleteCartItem, deleteAllCartItem } from '../controllers/cartControllers.js'
// import authUser from "../middlewares/authUser.js"

// const cartRoute = express.Router()

// cartRoute.post('/get', authUser, getUserCart)
// cartRoute.post('/add', authUser, addToCart)
// cartRoute.post('/update', authUser, updateCart)
// cartRoute.post('/delete', authUser, deleteCartItem)
// cartRoute.post('/delete-all', authUser, deleteAllCartItem)

// export default cartRoute

import express from 'express';
import {
  addToCart,
  getUserCart,
  updateCart,
  deleteCartItem,
  deleteAllCartItem
} from '../controllers/cartControllers.js';
import authUser from "../middlewares/authUser.js";

const cartRoute = express.Router();

cartRoute.post('/get', authUser, getUserCart);
cartRoute.post('/add', authUser, addToCart);
cartRoute.post('/update', authUser, updateCart);
cartRoute.post('/delete', authUser, deleteCartItem);
cartRoute.post('/delete-all', authUser, deleteAllCartItem);

export default cartRoute;
