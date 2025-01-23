import express from 'express'
import { authenticate } from '../authentication/jwt-authentication.js';
const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

// exmple page (token required for acccess page)
router.get('/profile', authenticate, (req, res) => {

});

export default router;