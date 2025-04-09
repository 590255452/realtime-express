import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// TODO 这是一个认证中间件，获取token并验证有效性，根据token中的id(即sign时传入的id)查找User数据且不包括password字段，将user数据添加到req对象中并继续下一个中间件或路由
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized - No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return res
                .status(401)
                .json({ message: "Unauthorized - Invalid Token" });
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
