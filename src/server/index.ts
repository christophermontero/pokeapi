import express from 'express';
import routes from '../routes/v1';
import colors from 'colors';
import connectDB from '../domain/repositories/mongoDb';
import logger from '../utils/logger';

const app = express();

routes(app);
connectDB(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.Info(colors.yellow.bold(`Server is running on port ${port}`));
});
