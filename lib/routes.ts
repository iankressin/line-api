import { Router } from 'express';

import PlaceController from './controllers/PlaceController';
import QueueController from './controllers/QueueController';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

import AuthValidator from './validators/AuthValidator';

const routes = Router();

// PLACES
routes.get('/place', PlaceController.index);
routes.get('/place/:placeId', PlaceController.get);
routes.post('/place', PlaceController.create);

// USER
routes.get('/user', UserController.index);
routes.post('/user', UserController.create);

// QUEUE
routes.get('/queue', AuthValidator.isOperator, QueueController.dequeue);
routes.post('/queue', AuthValidator.isUserSignedIn, QueueController.enqueue);

// AUTHENTICATION
routes.post('/auth/signin', AuthController.signIn);

export default routes;
