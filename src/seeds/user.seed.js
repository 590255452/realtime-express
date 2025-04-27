import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

// 定义种子用户，用户开发时模拟多个用户账户，需要单独执行
const seedUsers = [
    {
        fullName: "测试用户2",
        email: "hahah@example.com",
        password: "123456",
        profilePic: "",
    },
];
const seedDatabase = async () => {
    try {
        await connectDB();
        await User.insertMany(seedUsers);
        console.log("Database seeded successfullly");
    } catch (error) {
        console.error("Error seeding database", error);
    }
};

seedDatabase();
