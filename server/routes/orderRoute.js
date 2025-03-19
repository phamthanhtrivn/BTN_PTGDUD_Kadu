import express from 'express'
import authUser from "../middlewares/authUser.js"
import { placeOrder, userOrders } from '../controllers/orderControllers.js'

const orderRoute = express.Router()

orderRoute.post('/list', authUser, userOrders)
orderRoute.post('/place', authUser, placeOrder)

export default orderRoute