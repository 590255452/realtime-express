// 创建express实例并绑定到http服务器，创建io实例并与http绑定。监听连接ebSocket客户端(即socket.io-client)事件，打印连接信息并获取用户信息，广播getOnlineUsers给所有客户端，断开连接事件
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://realtime-react-production.up.railway.app",
            "https://realtime-chat-production-f8de.up.railway.app",
        ],
        credentials: true,
    },
});
const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
};

io.on("connection", (socket) => {
    console.log("connection:", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("disconnect:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
