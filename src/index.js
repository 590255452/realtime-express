import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";
import { initCloudinary } from "./lib/cloudinary.js";
initCloudinary();

// TODO 跨域(请求白名单 允许前端携带cookie) 解析json请求(请求体最大数据) 解析cookie 顺序一定要正确
app.use(
    cors({
        origin: function (origin, callback) {
            const allowedOrigins = [
                "http://localhost:5173",
                "https://realtime-react-production.up.railway.app",
                "https://realtime-chat-production-f8de.up.railway.app",
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
)
    .use(express.json({ limit: "10mb" }))
    .use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 前后端分离部署不需要该代码，必须放在路由之后
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// if (process.env.NODE_ENV == "production") {
//     const frontendPath = path.join(__dirname, "../../frontend/dist");
//     app.use(express.static(frontendPath));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(frontendPath, "index.html"));
//     });
// }

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    connectDB();
});
