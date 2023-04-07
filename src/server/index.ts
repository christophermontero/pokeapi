import colors from 'colors';
import express, { json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from '../domain/repositories/mongoDb';
import routes from '../routes/v1';
import logger from '../utils/logger';

const app = express();

app.use(helmet());
app.use(json());

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

connectDB(app);
routes(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.Info(colors.yellow.bold(`Server is running on port ${port}`));
});

export default server;
