import { Request } from 'express';
import investimentoModel from '../models/investimentoModel';

const buyAssets = async ( req: Request ) => {
  const { CodCliente, CodAtivo, QtdeAtivo } = req.body;
  await investimentoModel.addPurchase( CodCliente, CodAtivo, QtdeAtivo );

}

export default {
  buyAssets
}