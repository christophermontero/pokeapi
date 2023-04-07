import express, { json } from 'express';
import routes from '../routes/v1';
import colors from 'colors';
import connectDB from '../domain/repositories/mongoDb';
import logger from '../utils/logger';
import helmet from 'helmet';
import morgan from 'morgan';
import { serve, setup } from 'swagger-ui-express';

const app = express();

app.use(helmet());
app.use(json());

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

connectDB(app);
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.Info(colors.yellow.bold(`Server is running on port ${port}`));
});
