import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom"; // gọi bên trên là OK

const AIChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // ✅ gọi hook sớm, trước mọi return

  // ✅ KHÔNG return null trước hook nào
  const hiddenRoutes = ["/login", "/register"];
  const isHidden = hiddenRoutes.includes(location.pathname); // xử lý bằng biến

  useEffect(() => {
    const stored = localStorage.getItem("aiMessages");
    if (stored) {
      setMessages(JSON.parse(stored));
    }

    // ✅ Ngăn lặp câu chào bằng biến flag
    const justLoggedIn = localStorage.getItem("justLoggedIn") === "true";
    const hasWelcomed = sessionStorage.getItem("hasWelcomed") === "true";

    if (justLoggedIn && !hasWelcomed) {
      const welcomeMsg = {
        from: "ai",
        text: "👋 Chào mừng bạn đến với Kadu! Mình có thể giúp gì cho bạn hôm nay?",
      };
      setMessages((prev) => {
        const newMessages = [...prev, welcomeMsg];
        localStorage.setItem("aiMessages", JSON.stringify(newMessages));
        return newMessages;
      });

      // ✅ Đánh dấu là đã gửi chào
      localStorage.setItem("justLoggedIn", "false");
      sessionStorage.setItem("hasWelcomed", "true"); // 👈 đảm bảo trong session không chào lại
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => {
      const newMessages = [...prev, userMsg];
      localStorage.setItem("aiMessages", JSON.stringify(newMessages));
      return newMessages;
    });
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("site"),
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const reply = data.reply || "🤖 Không có phản hồi từ AI.";

      setMessages((prev) => {
        const newMessages = [...prev, { from: "ai", text: reply }];
        localStorage.setItem("aiMessages", JSON.stringify(newMessages));
        return newMessages;
      });
    } catch (err) {
      const errorMsg = { from: "ai", text: "❌ Lỗi khi gọi AI!" };
      setMessages((prev) => {
        const newMessages = [...prev, errorMsg];
        localStorage.setItem("aiMessages", JSON.stringify(newMessages));
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  if (isHidden) return null; // ✅ sau khi hook đã được gọi

  return createPortal(
    <div className="fixed bottom-6 right-6 lg:right-[2vw] z-[9999999] w-[90%] max-w-sm sm:w-[360px] text-base font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-[#005E4F] text-white px-4 py-3 flex justify-between items-center text-lg">
              <span className="font-semibold">💬 Kadu Chatbot</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setMessages([]);
                    localStorage.removeItem("aiMessages");
                  }}
                  className="text-white text-xs hover:text-red-200"
                >
                  🗑 Xoá
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-lg hover:text-gray-200"
                >
                  ✖
                </button>
              </div>
            </div>
            <div className="h-[400px] p-4 overflow-y-auto bg-gray-50 space-y-3 scroll-smooth">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-xl whitespace-pre-wrap ${
                    msg.from === "user"
                      ? "bg-green-100 text-right ml-auto max-w-[80%]"
                      : "bg-gray-200 text-left mr-auto max-w-[80%]"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="text-gray-400 text-sm italic">
                  Đang trả lời...
                </div>
              )}
            </div>
            <div className="flex border-t">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 p-3 outline-none text-sm"
                placeholder="Hỏi Kadu gì nè..."
              />
              <button
                onClick={handleSend}
                className="bg-[#005E4F] text-white px-5 hover:bg-[#007768] transition"
                disabled={loading}
              >
                Gửi
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 lg:right-[2vw] bg-[#005E4F] w-14 h-14 rounded-full shadow-xl text-2xl flex items-center justify-center text-white hover:bg-[#007768] transition z-[9999999]"
        >
          💬
        </button>
      )}
    </div>,
    document.body
  );
};

export default AIChatBox;

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { createPortal } from "react-dom";
// import { useLocation } from "react-router-dom"; //1

// const AIChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation(); //2

//   // 👇 step 3
//   const hiddenRoutes = ["/login", "/register"];
//   if (hiddenRoutes.includes(location.pathname)) {
//     return null; // 👈 step 4
//   }

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMsg = { from: "user", text: input };
//     setMessages((prev) => {
//       const newMessages = [...prev, userMsg];
//       localStorage.setItem("aiMessages", JSON.stringify(newMessages));
//       return newMessages;
//     });
//     setInput("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3001/ai-assistant", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           token: localStorage.getItem("site"),
//         },
//         body: JSON.stringify({ message: input }),
//       });

//       if (!res.ok) {
//         throw new Error("Không thể kết nối đến AI server.");
//       }

//       const data = await res.json();
//       const reply = data.reply || "🤖 Không có phản hồi từ AI.";

//       setMessages((prev) => {
//         const newMessages = [...prev, { from: "ai", text: reply }];
//         localStorage.setItem("aiMessages", JSON.stringify(newMessages));
//         return newMessages;
//       });
//     } catch (err) {
//       console.error("❌ Lỗi gọi AI:", err);
//       const errorMsg = { from: "ai", text: "❌ Lỗi khi gọi AI!" };
//       setMessages((prev) => {
//         const newMessages = [...prev, errorMsg];
//         localStorage.setItem("aiMessages", JSON.stringify(newMessages));
//         return newMessages;
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const stored = localStorage.getItem("aiMessages");
//     if (stored) {
//       setMessages(JSON.parse(stored));
//     }

//     const justLoggedIn = localStorage.getItem("justLoggedIn") === "true";
//     if (justLoggedIn) {
//       const welcomeMsg = {
//         from: "ai thân thiện",
//         text: "👋 Chào mừng bạn đến với Kadu! Mình có thể giúp gì cho bạn hôm nay?",
//       };
//       setMessages((prev) => {
//         const newMessages = [...prev, welcomeMsg];
//         localStorage.setItem("aiMessages", JSON.stringify(newMessages));
//         return newMessages;
//       });
//       localStorage.setItem("justLoggedIn", "false");
//     }
//   }, []);

//   // Auto scroll xuống khi có tin nhắn mới hoặc đang loading
//   // useEffect(() => {
//   //   const chatContainer = document.querySelector(".h-[400px]");
//   //   if (chatContainer) {
//   //     chatContainer.scrollTop = chatContainer.scrollHeight;
//   //   }
//   // }, [messages, loading]);

//   return createPortal(
//     <div className="fixed bottom-6 right-6 lg:right-[2vw] z-[9999999] w-[90%] max-w-sm sm:w-[360px] text-base font-sans">
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             key="chatbox"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white border border-gray-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
//           >
//             <div className="bg-[#005E4F] text-white px-4 py-3 flex justify-between items-center text-lg">
//               <span className="font-semibold">💬 Kadu Chatbot</span>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => {
//                     setMessages([]);
//                     localStorage.removeItem("aiMessages");
//                   }}
//                   className="text-white text-xs hover:text-red-200"
//                 >
//                   🗑 Xoá
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="text-white text-lg hover:text-gray-200"
//                 >
//                   ✖
//                 </button>
//               </div>
//             </div>
//             <div className="h-[400px] p-4 overflow-y-auto bg-gray-50 space-y-3 scroll-smooth">
//               {messages.map((msg, idx) => (
//                 <div
//                   key={idx}
//                   className={`px-4 py-2 rounded-xl whitespace-pre-wrap ${
//                     msg.from === "user"
//                       ? "bg-green-100 text-right ml-auto max-w-[80%]"
//                       : "bg-gray-200 text-left mr-auto max-w-[80%]"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               ))}
//               {loading && (
//                 <div className="text-gray-400 text-sm italic">
//                   Đang trả lời...
//                 </div>
//               )}
//             </div>
//             <div className="flex border-t">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     e.preventDefault();
//                     handleSend();
//                   }
//                 }}
//                 className="flex-1 p-3 outline-none text-sm"
//                 placeholder="Hỏi Kadu gì nè..."
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-[#005E4F] text-white px-5 hover:bg-[#007768] transition"
//                 disabled={loading}
//               >
//                 Gửi
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Nút tròn 💬 toggle, để ngoài AnimatePresence */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 right-6 lg:right-[2vw] bg-[#005E4F] w-14 h-14 rounded-full shadow-xl text-2xl flex items-center justify-center text-white hover:bg-[#007768] transition z-[9999999]"
//         >
//           💬
//         </button>
//       )}
//     </div>,
//     document.body
//   );
// };
// export default AIChatBox;
