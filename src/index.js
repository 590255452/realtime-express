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

const __dirname = path.resolve(); // 在es module中没有__dirname
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// TODO 顺序一定要正确 解析json请求(请求体最大数据) 跨域
app.use(cookieParser())
    .use(express.json({ limit: "10mb" }))
    .use(
        cors({
            origin: ["http://localhost:5173"],
            credentials: true,
        })
    );
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    connectDB();
});
