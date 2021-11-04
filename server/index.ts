import { server } from './server';

const PORT = process.env.PORT || 3001;

server().then((app) => {
  app.listen(() => {
    console.log(`server is running on port: ${PORT}`);
  });
});
