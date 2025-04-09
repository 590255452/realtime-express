import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";


// 前后端分离部署不需要这个代码
// const __dirname = path.resolve(); // 在es module中没有__dirname
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

// TODO 顺序一定要正确 解析json请求(请求体最大数据) 跨域
app.use(
    cors({
        origin: function (origin, callback) {
            const allowedOrigins = [
            "http://localhost:5173",
            "https://realtime-react-production.up.railway.app",
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
    .use(cookieParser())
    .use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    connectDB();
});
