import { Express, Router, json } from 'express';
import morgan from 'morgan';
import auth from './auth';

const router = Router();

function routes(app: Express) {
  app.use(json());

  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
  }

  const defaultRoutes = [
    {
      path: '/auth',
      handle: auth
    }
  ];

  defaultRoutes.forEach((route) => {
    router.use(route.path, route.handle);
  });
}

export default routes;
