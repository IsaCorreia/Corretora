import { Request, Response, Router } from 'express';
import { CREATED } from 'http-status-codes';
import investimentoService from '../services/investimentoService';

const investimentoController = Router();

investimentoController.get( '/', async ( req: Request, res: Response ): Promise<Response> => {
  const assets = await investimentoService.getAssets();
  return res.status(OK).json(assets)
 })

investimentoController.get( '/:id', async ( req: Request, res: Response ): Promise<Response> => {
  const asset = await investimentoService.getAssetById(req);
  return res.status(OK).json(asset)
 })

  await investimentoService.buyAssets( req );
  return res.status( CREATED ).json({message: 'Ações compradas'});
} )

export default investimentoController;