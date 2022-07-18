import { Request } from 'express';
import clienteModel from '../models/clienteModel';

const getAssetsByClient = async (req: Request) => {
  const { id } = req.params;
  const assets = await clienteModel.getAssetsByClient( Number(id) );
  return assets;
}

export default {
  getAssetsByClient
}