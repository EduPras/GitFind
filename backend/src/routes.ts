import { Router } from 'express';
import userController from './controllers/userController';
import mapController from './controllers/mapController';

const routes = Router();

routes.get('/', userController.index);

routes.post('/', userController.create);

routes.get('/map', mapController.getMarkers);

//routes.get('/map', ;

export default routes;