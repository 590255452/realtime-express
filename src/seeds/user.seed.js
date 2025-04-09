import { connectDB } from "../lib/db";
import User from "../models/user.model";

import { config } from "dotenv";
config();

const seedUsers = [];

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
