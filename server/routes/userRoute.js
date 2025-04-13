import express from 'express';
import {
  getUserInfo,
  login,
  register,
  verifyToken,
  forgotPassword,
  resetPassword,
  updateUserInfo,
} from '../controllers/userControllers.js';

import authUser from '../middlewares/authUser.js';

const userRoute = express.Router();

//Xác thực & xử lý tài khoản
userRoute.post('/login', login);
userRoute.post('/register', register);

// userRoute.post('/verifyToken', verifyToken);
userRoute.post('/verifyToken', authUser, verifyToken);

// Lấy thông tin user cần xác thực token
userRoute.post('/get', authUser, getUserInfo);

//Đổi mật khẩu
userRoute.post('/forgot-password', forgotPassword);
userRoute.post('/reset-password', resetPassword);

//Cập nhật thông tin cá nhân có xác thực token
userRoute.post('/updateUserInfo', authUser, updateUserInfo);

export default userRoute;







// import express from 'express';
// import { getUserInfo, login, register, verifyToken, forgotPassword, resetPassword, updateUserInfo } from '../controllers/userControllers.js';
// import authUser from '../middlewares/authUser.js';

// const userRoute = express.Router();

// userRoute.post('/login', login);
// userRoute.post('/register', register);
// userRoute.post('/verifyToken', verifyToken);
// userRoute.post('/get', authUser, getUserInfo);
// userRoute.post('/forgot-password', forgotPassword);
// userRoute.post('/reset-password', resetPassword);
// userRoute.post('/updateUserInfo', updateUserInfo);

// export default userRoute;
