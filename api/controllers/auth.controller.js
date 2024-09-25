import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler("404", "User not found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler("404", "Wrong credentials!"));
        }

        // Generate JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const userObject = validUser.toObject();
        delete userObject.password;
        res.cookie('access token:', token, { httpOnly: true }).status(200).json(userObject);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const userObject = user.toObject();
            delete userObject.password;
            res.cookie('access token:', token, { httpOnly: true }).status(200).json(userObject);
        } else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

            const newUser = new User({
                username: req.body.name.split("").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const userObject = newUser.toObject();
            delete userObject.password;
            res.cookie('access token:', token, { httpOnly: true }).status(200).json(userObject);
        }
    } catch (error) {
        next(error);
    }
};