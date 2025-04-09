import jwt from "jsonwebtoken";

// TODO 根据userId生成JWT，使用环境变量作为密钥对token进行签名，并且设置token的有效时间。将token通过cookie发送给客户端并返回
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, // 防止XSS攻击
        sameSite: "strict", // 防止CSRF攻击
        secure: process.env.NODE_ENV === "production", // 只有在生产环境中使用https传输cookie
    });
    return token;
};
