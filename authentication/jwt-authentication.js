import jwt from 'jsonwebtoken'

// create token for user from give data
const genrateToken = (userData) => {
    return jwt.sign(userData , process.env.SECRET_KEY , {expiresIn : '12h'});
}

// user authentication middleware 
const authenticate = (req, res, next) => {
    try {
        // Get token from the request header
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        next(); 
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};


export {genrateToken , authenticate};