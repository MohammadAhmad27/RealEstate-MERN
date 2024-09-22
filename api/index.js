import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('MongoDB connected successfully!');
}).catch(() => {
    console.error('Error connecting to MongoDB!');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});


app.use("/api/user", userRouter); 