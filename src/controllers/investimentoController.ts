import { Request, Response, Router } from 'express';
import { CREATED } from 'http-status-codes';
import investimentoService from '../services/investimentoService';

const investimentoController = Router();

investimentoController.get( '/', async ( req: Request, res: Response ): Promise<Response> => {
  const assets = await investimentoService.getAssets();
  return res.status(OK).json(assets)
 })

investimentoController.post( '/comprar', async ( req: Request, res: Response ) => {
  await investimentoService.buyAssets( req );
  return res.status( CREATED ).json({message: 'Ações compradas'});
} )

export default investimentoController;