import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Order from "../models/orderModel.js";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productFilePath = path.join(__dirname, "../data/products.json");
const articleFilePath = path.join(__dirname, "../data/articles.json");

// Đọc sản phẩm từ file JSON
const getProducts = () => {
  try {
    const raw = fs.readFileSync(productFilePath, "utf-8");
    const products = JSON.parse(raw);
    if (!Array.isArray(products)) throw new Error("Dữ liệu trong products.json không hợp lệ");
    return products;
  } catch (error) {
    console.error("❌ Lỗi khi đọc products.json:", error.message);
    return [];
  }
};

// Đọc bài viết từ file JSON
const getArticles = () => {
  try {
    const raw = fs.readFileSync(articleFilePath, "utf-8");
    const articles = JSON.parse(raw);
    if (!Array.isArray(articles)) throw new Error("Dữ liệu trong articles.json không hợp lệ");
    return articles;
  } catch (error) {
    console.error("❌ Lỗi khi đọc articles.json:", error.message);
    return [];
  }
};

export const aiAssistantController = async (req, res) => {
  const { message, messages: chatHistory = [] } = req.body;
  let contextReply = "";

  try {
    // Kiểm tra nếu có mã đơn hàng MongoDB ObjectId
    const orderIdMatch = message.match(/(?:mã đơn hàng[:\s]*)?([a-f0-9]{24})/i);
    if (orderIdMatch) {
      const mongoId = orderIdMatch[1];
      const order = await Order.findById(mongoId);

      if (order) {
        const productList = order.items.map(item => `+ ${item.name} (x${item.quantity})`).join("\n");
        contextReply += `Thông tin đơn hàng #${mongoId}:\n${productList}\n- Tổng tiền: ${order.amount}₫\n- Giao tới: ${order.address?.city || "?"}\n- Ngày đặt: ${new Date(order.date).toLocaleDateString("vi-VN")}\n\n`;
      } else {
        contextReply += `Tôi chưa có thông tin đơn hàng đó.\n\n`;
      }
    }

    // Nếu không có mã nhưng có token thì tìm đơn gần nhất
    else if (req.headers.token || req.headers.authorization) {
      try {
        const token = req.headers.token || req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userID = decoded.id;

        const lastOrder = await Order.findOne({ userID }).sort({ date: -1 });
        if (lastOrder) {
          const productList = lastOrder.items.map(item => `+ ${item.name} (x${item.quantity})`).join("\n");
          contextReply += `Đơn hàng gần nhất:\n${productList}\n- Tổng tiền: ${lastOrder.amount}₫\n- Giao tới: ${lastOrder.address?.city || "?"}\n- Ngày đặt: ${new Date(lastOrder.date).toLocaleDateString("vi-VN")}\n\n`;
        } else {
          contextReply += "Không tìm thấy đơn hàng gần đây.\n\n";
        }
      } catch (err) {
        console.error("❌ Lỗi xác thực token:", err.message);
        contextReply += "Không thể kiểm tra đơn hàng vì token không hợp lệ.\n\n";
      }
    }

    // Gợi ý sản phẩm nếu có từ khóa liên quan
    const keywordMatch = message.match(/(bút|giấy|vở|sổ|gôm|keo|đèn|học sinh|văn phòng phẩm)/i);
    if (keywordMatch) {
      const keyword = keywordMatch[1].toLowerCase();
      const products = getProducts();
      const matched = products.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.category.toLowerCase().includes(keyword)
      ).slice(0, 3);

      if (matched.length > 0) {
        contextReply += `Sản phẩm phù hợp:\n`;
        matched.forEach(p => {
          contextReply += `- ${p.name} (${p.category}) – ${p.price}₫\n`;
        });
        contextReply += "\n";
      } else {
        contextReply += `Không tìm thấy sản phẩm phù hợp với từ khóa "${keyword}".\n\n`;
      }
    }

    // Gợi ý bài viết nếu có từ khóa liên quan
    const articleKeywordMatch = message.match(/(giới thiệu|mẹo|blog|bài viết)/i);
    if (articleKeywordMatch) {
      const keyword = articleKeywordMatch[1].toLowerCase();
      const articles = getArticles();
      const matched = articles.filter(a =>
        a.title.toLowerCase().includes(keyword) ||
        a.content.some(c => c.text?.toLowerCase().includes(keyword) || c.subTitle?.toLowerCase().includes(keyword))
      ).slice(0, 2);

      if (matched.length > 0) {
        contextReply += `Bài viết liên quan:\n`;
        matched.forEach(a => {
          contextReply += `- ${a.title} (Ngày đăng: ${new Date(a.timeRelease).toLocaleDateString("vi-VN")})\n`;
        });
        contextReply += "\n";
      } else {
        contextReply += `Không tìm thấy bài viết phù hợp với "${keyword}".\n\n`;
      }
    }

    // Gửi câu hỏi + dữ liệu cho AI phản hồi
    const fullMessages = [
      {
        role: "system",
        content: `Bạn là một trợ lý chăm sóc khách hàng chuyên nghiệp của Kadu - cửa hàng văn phòng phẩm. 
Chỉ trả lời dựa trên dữ liệu được cung cấp trong hệ thống (contextReply).
- Tuyệt đối không lặp lại câu hỏi của khách.
- Trả lời ngắn gọn, đúng trọng tâm, tối đa 3 dòng.
- Có thể giao tiếp bằng nhiều ngôn ngữ khác nhau.
- Không dùng markdown, không quá nhiều emoji, không viết kiểu chatbot.
- Có thể nối tiếp nội dung đang hỏi.
- Nếu không đủ dữ liệu, hãy trả lời: "Tôi chưa có thông tin đơn hàng đó."`
      },
      ...chatHistory.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
      {
        role: "user",
        content: `Thông tin từ hệ thống:\n${contextReply}\n\nCâu hỏi khách: "${message}"`
      }
    ];

    // Gọi OpenRouter AI
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: fullMessages,
      }),
    });

    const data = await aiRes.json();
    const reply = data.choices?.[0]?.message?.content || "Tôi chưa thể phản hồi lúc này.";
    res.json({ reply });

  } catch (err) {
    console.error("❌ Lỗi AI:", err);
    res.status(500).json({ reply: "❌ Gọi AI thất bại. Vui lòng kiểm tra API Key hoặc nội dung gửi." });
  }
};
