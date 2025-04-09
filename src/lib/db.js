import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const coon = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb Connect successfully: ${coon}`);
    } catch (err) {
        console.log(`Mongodb connection error: ${err}`);
    }
};
