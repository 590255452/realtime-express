import jwt from "jsonwebtoken";

// TODO 根据userId生成JWT，使用环境变量作为密钥对token进行签名，并且设置token的有效时间。将token通过cookie发送给客户端并返回
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // 防止XSS攻击
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // 浏览器携带cookie，防止CSRF攻击（strict同站请求时携带、lax同站和跨站get请求、none跨站请求）
        secure: process.env.NODE_ENV === "production", // 浏览器是否只能在https下发送cookie
    });
    return token;
};
