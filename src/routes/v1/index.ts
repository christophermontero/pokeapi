import { Express, Router, json } from 'express';
import morgan from 'morgan';
import auth from './auth';
import config from 'config';

const router = Router();
const baseUri = config.get('baseUri');

const routes = (app: Express) => {
  app.use(json());

  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }

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
