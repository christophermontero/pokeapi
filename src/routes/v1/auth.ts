import { Router } from 'express';
const auth = Router();

auth.get('/', (req, res) => {
  return res.send('Hello World!');
});

export default auth;
