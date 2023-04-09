import config from 'config';
import { Express, Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import * as swaggerDocument from '../../../docs/rocketmon-api-doc-v1.json';
import auth from '../../controllers/auth';
import pokemonBridge from '../../controllers/pokemonBridge';

const router = Router();
const baseApiUrl = config.get('baseApiUrl');

const routes = (app: Express) => {
  router.use('/docs', serve);
  router.get('/docs', setup(swaggerDocument));

  const defaultRoutes = [
    {
      path: `/auth`,
      handle: auth
    },
    {
      path: `/pokemon`,
      handle: pokemonBridge
    }
  ];

  defaultRoutes.forEach((route) => {
    router.use(route.path, route.handle);
  });

  return app.use(`${baseApiUrl}`, router);
};

export default routes;
