import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Kết nối cơ sở dữ liệu
connectDB();

app.use(cors());
app.use(express.json());

// Sử dụng route
app.use("/auth", userRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
