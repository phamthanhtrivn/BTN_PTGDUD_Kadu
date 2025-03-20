import express from 'express';
import { getUserInfo, login, register, verifyToken, forgotPassword, resetPassword } from '../controllers/userControllers.js';
import authUser from '../middlewares/authUser.js';

const userRoute = express.Router();

userRoute.post('/login', login);
userRoute.post('/register', register);
userRoute.post('/verifyToken', verifyToken);
userRoute.post('/get', authUser, getUserInfo);
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/reset-password', resetPassword);

export default userRoute;
