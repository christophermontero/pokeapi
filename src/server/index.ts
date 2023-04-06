import express from 'express';
import routes from '../routes/v1';

const app = express();

routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
