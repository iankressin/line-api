import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

class App {
  public express: express.Application;
  
  constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.session();

    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    const mongoUrl = 'mongodb+srv://admin:admin@cluster0-owhdh.mongodb.net/Queue?retryWrites=true&w=majority'

    mongoose.connect(
      mongoUrl, 
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    );
  }

  private session(): void {
    this.express.use(expressSession({
        secret: 'test',
        resave: false,
        saveUninitialized: true
      })
    )
  };

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
