
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra có token không
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không tìm thấy token xác thực!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Giải mã token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Lưu thông tin user vào request để các controller có thể dùng
    req.user = decoded;

    // Cho phép đi tiếp
    next();
  } catch (err) {
    console.error('Lỗi xác thực token:', err.message);
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

export default authUser;

// phiên bản đầu tiên sau khi update
// import jwt from 'jsonwebtoken';

// const authUser = (req, res, next) => {
//   const token = req.headers.token || req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Không có token!" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // => có thể dùng req.user.id ở các controller
//     next();
//   } catch (error) {
//     console.error("❌ authUser fail:", error.message);
//     return res.status(403).json({ message: "Token không hợp lệ!" });
//   }
// };

// export default authUser;


// trí
// const authUser = (req, res, next) => {
//     const { token } = req.headers
//     if (!token) {
//         return res.json({success: false, message: 'Không có token!'})
//     }

//     try {
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.email = token_decode.email
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
//     }
// };

