import { Request } from 'express';
import investimentoModel from '../models/investimentoModel';

const buyAssets = async ( req: Request ) => {
  const { CodCliente, CodAtivo, QtdeAtivo } = req.body;
  await investimentoModel.addPurchase( CodCliente, CodAtivo, QtdeAtivo );

  // Recupera informações do ativo para atualizar o estoque da Corretora
  const [assetInfo] = await investimentoModel.getAsset( CodAtivo );
  const newAssetStock = Number(assetInfo.QtdeAtivo - QtdeAtivo);
  await investimentoModel.updateAssetStock( newAssetStock, CodAtivo );

}

export default {
  buyAssets
}