import { Router } from 'express';

import PlaceController from './controllers/PlaceController';
import QueueController from './controllers/QueueController';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import ReviewController from './controllers/ReviewController';

import AuthValidator from './validators/AuthValidator';

const routes = Router();

// PLACES
routes.get('/place', PlaceController.index);
routes.get('/place/:placeId', PlaceController.get);
routes.post('/place', PlaceController.create);

// USER
routes.get('/user', UserController.index);
routes.post('/user', UserController.create);
routes.post(
  '/user/offer',
  AuthValidator.isUserSignedIn,
  UserController.createOffer,
);

// QUEUE
routes.get('/queue', AuthValidator.isOperator, QueueController.dequeue);
routes.post('/queue', AuthValidator.isUserSignedIn, QueueController.enqueue);

// AUTHENTICATION
routes.post('/auth/signin', AuthController.signIn);

// REVIEW
routes.post('/review', AuthValidator.isUserSignedIn, ReviewController.create);
routes.get('/review', AuthValidator.isOperator, ReviewController.list);
routes.get(
  '/review/groupedScores',
  AuthValidator.isOperator,
  ReviewController.groupedScores
);
routes.get(
  '/review/groupedUsersByScore/:score',
  AuthValidator.isOperator,
  ReviewController.groupedUsersByScore
);
routes.get('/review/nps', AuthValidator.isOperator, ReviewController.nps);

export default routes;
