import { Router } from 'express';

import PlaceController from './controllers/PlaceController';
import QueueController from './controllers/QueueController';
import UserController from './controllers/UserController';

const routes = Router();

// PLACES
routes.get('/place', PlaceController.index);
routes.get('/place/:id', PlaceController.index);
routes.post('/place', PlaceController.create);

// USER
routes.get('/user', UserController.index);
routes.post('/user', UserController.create);

// QUEUE
routes.get('/queue/:placeId', QueueController.dequeue);
routes.post('/queue', QueueController.enqueue);

export default routes;
