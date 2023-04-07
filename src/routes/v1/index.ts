import { Express, Router } from 'express';
import auth from '../../controllers/auth';
import config from 'config';
import { serve, setup } from 'swagger-ui-express';
import * as swaggerDocument from '../../../docs/rocketmon-api-doc-v1.json';

const router = Router();
const baseUri = config.get('baseUri');

const routes = (app: Express) => {
  router.use('/docs', serve);
  router.get('/docs', setup(swaggerDocument));

  const defaultRoutes = [
    {
      path: `/auth`,
      handle: auth
    }
  ];

  defaultRoutes.forEach((route) => {
    router.use(route.path, route.handle);
  });

  return app.use(`${baseUri}`, router);
};

export default routes;
