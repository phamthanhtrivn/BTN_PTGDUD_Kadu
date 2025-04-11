import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ResetToken from '../models/ResetTokenModel.js';
import nodemailer from 'nodemailer';
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
            phone,
            address: {
                city: "",
                district: "",
                ward: "",
                street: "",
            }
        });
        await newUser.save();
        res.status(200).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error(error);
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
// cũ
        // const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        // mới dùng user_id
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

// cũ
        // res.status(200).json({
        //     user: { email },
        //     token,
        // });
        // mới sửa_chan
        res.status(200).json({
            user: {
              id: user._id,
              email: user.email,
              name: user.name,
            },
            token,
          });
          
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// export const verifyToken = (req, res) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: "Không có token!" });
//     }

//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: "Token không hợp lệ!" });
//         }
//         // res.status(200).json({ user: { email: decoded.email } });
//     //    sửa lại 
//     res.status(200).json({ user: { id: decoded.id } });

//     });
// };
export const verifyToken = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Không có token!" });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userData = await User.findById(decoded.id).select("-password"); // tránh gửi password
  
      if (!userData) {
        return res.status(404).json({ message: "Không tìm thấy người dùng!" });
      }
  
      res.status(200).json({ user: userData });
    } catch (err) {
      return res.status(403).json({ message: "Token không hợp lệ!" });
    }
  };
  

// export const getUserInfo = async (req, res) => {
//     try {
//         const { email } = req.body
//         const userData = await User.findOne({ email })
//         if (!userData) {
//             return res.json({ success: false, message: "Người dùng ko tồn tại!" });
//         }
//         return res.json({ success: true, user: userData })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }
export const getUserInfo = async (req, res) => {
  try {
      const { id } = req.user; // lấy từ token
      const userData = await User.findById(id).select("-password");
      if (!userData) {
          return res.json({ success: false, message: "Người dùng không tồn tại!" });
      }
      return res.json({ success: true, user: userData });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
  }
};


export const forgotPassword = async (req, res) => {
    // Cấu hình email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    // API: Gửi email đặt lại mật khẩu
    try {
        const { email } = req.body;

        const user = User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: "Email không tồn tại!" });

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "3m" }); // Token có hiệu lực 15 phút
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
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export const resetPassword = async (req, res) => {
    // API: Xác nhận token và cập nhật mật khẩu mới
    const { token, newPassword } = req.body;
    try {
        // Kiểm tra token trong MongoDB
        const storedToken = await ResetToken.findOne({ token });
        if (!storedToken || storedToken.isUsed) {
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
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
}
// lấy từ email
// export const updateUserInfo = async (req, res) => {
//     try {
//         const { user } = req.body;
//         await User.findOneAndUpdate({ email: user.email }, { ...user });
//         return res.json({ success: true, message: "Cập nhật thông tin thành công!" });
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// chuyển sang dùng lấy từ req.user.id thay vì user.email
export const updateUserInfo = async (req, res) => {
  try {
      const { user } = req.body;
      const userId = req.user.id; // từ token

      await User.findByIdAndUpdate(userId, { ...user });
      return res.json({ success: true, message: "Cập nhật thông tin thành công!" });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};

  
  
  
