import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDB connected successfully!');
}).catch(() => {
    console.error('Error connecting to MongoDB!');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})