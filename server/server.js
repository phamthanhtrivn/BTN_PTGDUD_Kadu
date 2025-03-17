import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/.env` });
// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('✅ Kết nối MongoDB Atlas thành công!'))
      .catch(err => console.error('❌ Lỗi kết nối:', err));

// Tạo Schema
const UserSchema = new mongoose.Schema({
      id: Number,
      username: String,
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

app.use(cors());
app.use(express.json());

// API Login
app.post("/auth/login", async (req, res) => {
      const { username, password } = req.body;

      // Tìm trực tiếp trong MongoDB Atlas với điều kiện `username`
      const findUser = await User.findOne({ username: username });

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
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

      // Trả về kết quả
      res.status(200).json({
            user: { username },
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
                  user: { username: decoded.username },
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

            // Hash mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            // Tạo tài khoản mới
            const newUser = new User({
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

app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
});

// mongodb+srv://truong:<db_password>@cluster0.rwpfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0