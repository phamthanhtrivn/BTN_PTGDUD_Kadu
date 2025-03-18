import mongoose from 'mongoose';
const resetTokenSchema = new mongoose.Schema({
      email: { type: String, required: true },
      token: { type: String, required: true },
      isUsed: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now, expires: 180 }, // Token hết hạn sau 3 phút
});

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

export default ResetToken;
