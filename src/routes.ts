import { Router } from 'express';
import clienteController from './controllers/clienteController';
import contaController from './controllers/contaController';
import investimentoController from './controllers/investimentoController';

const routes = Router();

routes.use( '/investimentos', investimentoController );
routes.use( '/ativos', clienteController );
routes.use( '/conta', contaController );

export default routes;