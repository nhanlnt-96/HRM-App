import { server } from './server';
import { db } from './models';

require('dotenv').config();

const PORT = process.env.PORT || 3001;

db.sequelize
  .sync()
  .then(() => {
    server().then((app) => {
      app.listen(() => {
        console.log('\x1b[36m', `\nApp running at http://localhost:${PORT}`);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
