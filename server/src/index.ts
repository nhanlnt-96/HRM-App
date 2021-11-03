import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { createConnection } from 'typeorm';

const server = async () => {
  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(cors());
  app.use(express.json());
  // app.use(
  //   '/graphql',
  //   graphqlHTTP({
  //     schema,
  //     graphiql: true,
  //   }),
  // );

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

server().catch((err) => {
  console.log(err);
});
