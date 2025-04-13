const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/.env` });
// Kết nối MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Kết nối MongoDB Atlas thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối:", err));

// Tạo Schema
const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  password: String,
  email: String,
  phone: String,
});
// Tạo model từ Schema
const User = mongoose.model("User", UserSchema);

// Cấu hình email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// API: Gửi email đặt lại mật khẩu
app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;

  // const user = User.findOne({ email: email });
  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ message: "Email không tồn tại!" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "3m",
  }); // Token có hiệu lực 15 phút
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
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
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
