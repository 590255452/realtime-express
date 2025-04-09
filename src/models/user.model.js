import mongoose from "mongoose";

const { Schema } = mongoose;

// TODO 定义DmongoDB的数据结构，timestamps会自动添加时间戳字段即timestamps和timestamps，最后创建User模型
const usersSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 6 },
        profilePic: { type: String, default: "" },
    },
    { timestamps: true }
);

const User = mongoose.model("User", usersSchema);

export default User;
