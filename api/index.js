import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
const app = express();
app.use(express.json());


//Connecting to MongoDB 
main().then(() => {
    console.log("Connected to MongoDB!");
})
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
