import { Router } from 'express';
import contaController from './controllers/contaController';
import investimentoController from './controllers/investimentoController';

const routes = Router();

routes.use( '/investimentos', investimentoController );
routes.use( '/conta', contaController );

export default routes;