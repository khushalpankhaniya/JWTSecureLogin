import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const connection = mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Database Connection was successful');
    })
    .catch(err => {
        console.error('Connection failed:', err.message);
    });

export default connection;