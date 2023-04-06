import express from 'express';
import routes from '../routes/v1';
import colors from 'colors';

const app = express();

routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(colors.yellow.bold(`Server is running on port ${port}`));
});
