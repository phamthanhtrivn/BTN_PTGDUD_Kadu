import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import ResetToken from './ResetToken.js';


const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/.env` });
// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
      .catch(err => console.error('❌ Lỗi kết nối:', err));

// Tạo Schema
const UserSchema = new mongoose.Schema({
      id: Number,
      name: String,
      password: String,
      email: String,
      phone: String
});
// Tạo model từ Schema
const User = mongoose.model('User', UserSchema);


const app = express();
const PORT = 3001;

// Secret key để tạo JWT
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
      throw new Error("❌ Không tìm thấy JWT_SECRET trong file .env");
}


// Cấu hình email
const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
      },
});
app.use(cors());
app.use(express.json());

// API Login
app.post("/auth/login", async (req, res) => {
      const { email, password } = req.body;

      // Tìm trực tiếp trong MongoDB Atlas với điều kiện 
      const findUser = await User.findOne({ email: email });
      console.log(email, password, findUser);
      // Kiểm tra nếu không tìm thấy user
      if (!findUser) {
            return res.status(401).json({ message: "Sai tài khoản!" });
      }

      // Kiểm tra mật khẩu
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
      if (!isPasswordValid) {
            return res.status(401).json({ message: "Sai mật khẩu!" });
      }

      // Tạo token JWT
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

      // Trả về kết quả
      res.status(200).json({
            user: { email },
            token,
      });
});
// API xác thực token
app.post("/auth/verifyToken", (req, res) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
            return res.status(401).json({ message: "Không có token!" });
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                  return res.status(403).json({ message: "Token không hợp lệ!" });
            }
            res.status(200).json({
                  user: { email: decoded.email },
            });
      });
});
// API Register
app.post("/auth/register", async (req, res) => {
      const { username, password, email, phone } = req.body;

      try {
            // Kiểm tra nếu user đã tồn tại trong database
            const existingUser = await User.findOne({ username: username });
            if (existingUser) {
                  return res.status(401).json({ message: "Tài khoản đã tồn tại!" });
            }
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail) {
                  return res.status(401).json({ message: "Email đã tồn tại!" });
            }
            // Hash mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo tài khoản mới
            const newUser = new User({
                  id: User.length + 1,
                  username,
                  password: hashedPassword,
                  email,
                  phone
            });

            // Lưu vào database
            await newUser.save();

            res.status(201).json({ message: "Đăng ký thành công!" });
      } catch (error) {
            console.error("❌ Lỗi:", error);
            res.status(500).json({ message: "Lỗi server!" });
      }
});

// API: Gửi email đặt lại mật khẩu
app.post("/api/forgot-password", async (req, res) => {
      const { email } = req.body;

      const user = User.findOne({ email: email });
      if (!user) return res.status(404).json({ message: "Email không tồn tại!" });

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "3m" }); // Token có hiệu lực 15 phút
      const resetLink = `http://localhost:5173/reset-password?token=${token}`;

      // Lưu token vào MongoDB
      await ResetToken.create({ email, token });

      const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "🔑 Đặt lại mật khẩu của bạn",
            html: `
              <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #333;">🔒 Yêu cầu đặt lại mật khẩu</h2>
                <p style="font-size: 16px; color: #555;">
                  Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào nút bên dưới để tiếp tục:
                </p>
                <a href="${resetLink}" style="
                  display: inline-block;
                  background-color: #007bff;
                  color: white;
                  padding: 12px 20px;
                  text-decoration: none;
                  font-size: 16px;
                  border-radius: 5px;
                  font-weight: bold;
                  margin-top: 10px;
                ">Đặt lại mật khẩu</a>
                <p style="font-size: 14px; color: #999; margin-top: 20px;">
                  Nếu bạn không yêu cầu, hãy bỏ qua email này. Liên kết có hiệu lực trong 3 phút.
                </p>
              </div>
            `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ message: "Lỗi khi gửi email!" });
            res.json({ message: "Link đặt lại mật khẩu đã được gửi!" });
      });
});

// API: Xác nhận token và cập nhật mật khẩu mới
app.post("/api/reset-password", async (req, res) => {
      const { token, newPassword } = req.body;
      try {
            // Kiểm tra token trong MongoDB
            const storedToken = await ResetToken.findOne({ token });
            if (!storedToken || storedToken.isUsed) {
                  return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const email = decoded.email;
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.findOneAndUpdate({ email }, { password: hashedPassword });

            storedToken.isUsed = true;
            await storedToken.save();
            res.json({ message: "Mật khẩu đã được cập nhật!" });
            // xoa token

      } catch (error) {
            res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
      }
});
app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});
