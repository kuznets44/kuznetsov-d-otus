
const config = require('./config');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const serveStatic = require('serve-static');
const { graphqlHTTP } = require('express-graphql');
const graphQLSchema = require('./schema');          //описание сущностей
const GraphQLResolver = require('./resolver');      //объект, содержащий резолверы

const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_SERVER}/`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const resolver = new GraphQLResolver(client, config.DB_NAME);

//соединяемся
client.connect(err => {
  if(err) {
    console.log(`Can't connect to MongoDB!`);
    throw new Error(err);
  }
  
  console.log('Connected to the DB');
  
  //создаем экземпляр приложения express и запускаем его
  const app = express();
  app.use(serveStatic(__dirname));

  //подключаем сервер GraphQL
  app.use(
    '/graphql',
    graphqlHTTP({
      rootValue: resolver,
      schema: graphQLSchema,
      graphiql: true,
    }),
  );

  app.listen(3000, () => {
    console.log('Web server working...')
  })
});