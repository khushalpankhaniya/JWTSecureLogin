import express from 'express'
import dotenv from 'dotenv'
import connection from './db/connection.js'
import staticRouter from './routes/fileRoutes.js'
import logicRouter from './routes/logicRoutes.js'

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', staticRouter);
app.use('/auth', logicRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});