import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { name, password, email, phone } = req.body;

    try {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(401).json({ message: "Email đã tồn tại!" });
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new User({
            name,
            password: hashedPassword,
            email,
            phone
        });

        await newUser.save();

        res.status(200).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("❌ Lỗi:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Sai tài khoản!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Sai mật khẩu!" });
        }

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            user: { email },
            token,
        });
    } catch (error) {
        console.error("❌ Lỗi:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

export const verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Không có token!" });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token không hợp lệ!" });
        }
        res.status(200).json({ user: { email: decoded.email } });
    });
};


export const getUserInfo = async (req, res) => {
    try {
        const { email } = req.body
        const userData = await User.findOne({ email })
        if (!userData) {
            return res.json({ success: false, message: "Người dùng ko tồn tại!" });
        }

        return res.json({ success: true, user: userData})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}
