import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import indexRouter from './routers/indexRoutes';
import mongoose from 'mongoose';
import compression from 'compression'
import cors from 'cors'
import fincaRoutes from './routers/FincaRoutes'
import dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/../.env' });
class Server {
     public app: express.Application;

     constructor() {
          this.app = express();
          this.config();
          this.router();
         
     }

     config() {
          const MONGO_URI = 'mongodb://localhost:27017/restapit'
          mongoose.connect( process.env.MONGODB_URI || MONGO_URI , {
               useNewUrlParser: true, 
               useCreateIndex: true,
               useUnifiedTopology: true
          }).then(db => console.log('Db Connected')
          );
          //setting
          this.app.set('port', process.env.PORT
               || 3000);
           //middleware
          this.app.use(morgan('dev'));
          this.app.use(helmet());
          this.app.use(cors());
          this.app.use(compression());
          this.app.use(express.json());
          this.app.use(express.urlencoded({ extended: false }));
     }

     router() {
          this.app.use(indexRouter);
          this.app.use('/api/finca',fincaRoutes); 
     }

     start() {
          this.app.listen(this.app.get('port'),
               () => {
                    console.log('Server on port', this.app.get('port'))
                    
               }

          )

     }
}

const server = new Server();
server.start();