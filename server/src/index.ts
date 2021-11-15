import express from 'express';
import cors from 'cors';
import { db } from './models';
import { educationRouter } from './routes/Education';

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Education router
app.use('/education', educationRouter);

app.listen(PORT, () => {
  console.log(`Server is connected to http://localhost:${PORT}`);
  db.sequelize
    .sync()
    .then(() => {
      console.log('App connected to database');
    })
    .catch((error) => {
      console.log(error);
    });
});
