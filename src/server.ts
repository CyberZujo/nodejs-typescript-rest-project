import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRouter  from './routes/user-routes';
import shoppingListRouter  from './routes/shopping-list.routes';
import publicRouter  from './routes/public.routes';

import config from './utils/config';

class Server {
    public app: express.Application;
    
    constructor() {
        this.app = express();
    }

    private config() {
        this.app.set('port', config.app.PORT);
        this.app.set('jwt-secret', config.token.SECRET);
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    private initializeRoutes() {
        this.app.use('/', publicRouter);
        this.app.use('/user', userRouter);
        this.app.use('/shoppingList', shoppingListRouter);
    }

    private databaseConnect() {
        const connection = mongoose.connection;

        connection.on("connected", () => {
          console.log("Mongo Connection Established");
        });

        connection.on("error", (error: Error) => {
          console.log("Mongo Connection ERROR: " + error);
        });
    
        const run = async () => {
          await mongoose.connect((config.database.CONNECTION_STRING), {
            keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
          });
        };
        run().catch(error => console.error(error));
      }

      public start() {
          this.config();
          this.app.listen(this.app.get('port'), () => {
            console.log('Server is listening on port ' + this.app.get('port'));
          });
          this.initializeRoutes();
          this.databaseConnect();
      }
}

const server = new Server();
server.start();
module.exports = server.app;
