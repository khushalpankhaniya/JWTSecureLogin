import express from 'express'
import { User } from '../db/user_schema.js'
import bcrypt from 'bcrypt'
import { genrateToken  , authenticate } from '../authentication/jwt-authentication.js';
const router = express.Router();


router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser)  return res.status(400).json({ success : false , message :'Email already in use.'}); 

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashPassword, });
        await user.save();

        res.status(201).json({ success : true , message  :`Account created for ${user.email}`});

    } catch (error) {
        console.error('Error during sign up:', error.message);
        res.status(500).json({ success : false , message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(404).json({ success : false , message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(401).json({ success : false , message: 'Invalid credentials' });
        }
        const tokenPayload = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
        };
        const token = genrateToken(tokenPayload);
        
        res.status(201).json({ success : true , message: 'Login successful' ,  token});

    } catch (error) {
        console.error('Error during Login:', error.message);
        res.status(500).json({ success : false , message: 'Internal server error' });
    }
});

router.get('/profile', authenticate, async (req, res) => {
    try {
        const {_id} = req.userData;

        const userData = await User.findById({_id});

        res.status(201).json({ success : true , userData : userData});

    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default router;