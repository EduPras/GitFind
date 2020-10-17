import { Router, Request, Response } from 'express';
import userController from './controllers/userController';
const routes = Router();

routes.get('/', userController.index);

routes.post('/', userController.create);

export default routes;