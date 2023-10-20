import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import * as swaggerDocument from '../../../docs/rocketmon-api-doc-v1.json';
import config from '../../config/config';
import auth from './auth.route';
import pokemon from './pokemon.route';

const router = Router();
const defaultRoutes = [
  {
    path: `/auth`,
    handle: auth
  },
  {
    path: `/pokemon`,
    handle: pokemon
  }
];

if (config.env === 'development') {
  router.use('/docs', serve);
  router.get('/docs', setup(swaggerDocument));
}

defaultRoutes.forEach((route) => {
  router.use(route.path, route.handle);
});

export default router;
