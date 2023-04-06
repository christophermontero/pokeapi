import { Router } from 'express';
const auth = Router();

auth.get('/', (req, res) => {
  res.send('Hello World!');
});

export default auth;
