import { Router } from 'express';
import clienteController from './controllers/clienteController';

const routes = Router();

routes.use( '/investimentos', ()=>{} );
routes.use( '/ativos', clienteController );
routes.use( '/conta', () => { } );

export default routes;