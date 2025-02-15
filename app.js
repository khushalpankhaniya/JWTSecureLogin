import express from 'express'
import dotenv from 'dotenv'
import connection from './db/connection.js'
import fileRouter from './routes/fileRoutes.js'
import logicRouter from './routes/logicRoutes.js'
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors());

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', fileRouter);
app.use('/auth', logicRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});