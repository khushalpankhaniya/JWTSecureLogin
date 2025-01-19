import express from 'express'
import { authenticate } from '../authentication/jwt-authentication.js';
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

//token required for acccess page
router.get('/home', authenticate, (req, res) => {
    res.render('home');
});

export default router;