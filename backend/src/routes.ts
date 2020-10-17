import { Router } from 'express';
import getDataRepos from './services/github';
const routes = Router();

routes.get('/', getDataRepos)

export default routes;