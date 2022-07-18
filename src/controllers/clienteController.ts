import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';
import clienteService from '../services/clienteService';

const clienteController = Router();

clienteController.get( '/:id', async ( req: Request, res: Response ) => {
  const assets = await clienteService.getAssetsByClient(req);
  return res.status( OK ).json( assets );
} );

export default clienteController;