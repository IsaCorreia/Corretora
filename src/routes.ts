import { Router } from 'express';
import clienteController from './controllers/clienteController';
import investimentoController from './controllers/investimentoController';

const routes = Router();

routes.use( '/investimentos', investimentoController );
routes.use( '/ativos', clienteController );
routes.use( '/conta', () => { } );

export default routes;