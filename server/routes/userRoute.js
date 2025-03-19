import express from 'express';
import { login, register, verifyToken } from '../controllers/userControllers.js';

const userRoute = express.Router();

userRoute.post('/login', login);
userRoute.post('/register', register);
userRoute.post('/verifyToken', verifyToken);

export default userRoute;
