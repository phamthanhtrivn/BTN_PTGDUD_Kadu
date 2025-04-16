import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/../.env` });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Kết nối MongoDB Atlas thành công!');
    } catch (err) {
        console.error('❌ Lỗi kết nối:', err);
        process.exit(1);
    }
};

export default connectDB;

// 