import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cartControllers.js'
import authUser from "../middlewares/authUser.js"

const cartRoute = express.Router()

cartRoute.post('/get', authUser, getUserCart)
cartRoute.post('/add', authUser, addToCart)
cartRoute.post('/update', authUser, updateCart)

export default cartRoute