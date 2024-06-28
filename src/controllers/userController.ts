import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ token });
    } catch (err:any) {
        res.status(400).json({ error: err.message });
    }
};
