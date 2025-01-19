import express from 'express'
import { User } from '../db/user_schema.js'
import bcrypt from 'bcrypt'
import { genrateToken } from '../authentication/jwt-authentication.js';
const router = express.Router();


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) res.status(400).json('Email already in use.');

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashPassword, });
        await user.save();

        res.status(201).json({message  :`Account created for ${user.email}`});

    } catch (error) {
        console.error('Error during sign up:', error.message);
        res.status(500).send('Internal server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const tokenPayload = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
        };
        const token = genrateToken(tokenPayload);

        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during Login:', error.message);
        res.status(500).send('Internal server error');
    }
});

export default router;