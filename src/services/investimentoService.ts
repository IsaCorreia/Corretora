import { Request } from 'express';
import IAsset from '../interfaces/IAsset';
import clienteModel from '../models/clienteModel';
import investimentoModel from '../models/investimentoModel';

const getAssets = async (): Promise<IAsset[]> => {
  const assets = await investimentoModel.getAllAssets();
  return assets;
}

const getAssetById = async ( req: Request ): Promise<IAsset> => {
  const { id } = req.params;
  const [asset] = await investimentoModel.getAsset(Number(id));
  return asset;
}

const buyAssets = async ( req: Request ): Promise<void> => {
  const { CodCliente, CodAtivo, QtdeAtivo } = req.body;
  // Adiciona a compra ao registro
  await investimentoModel.addPurchase( CodCliente, CodAtivo, QtdeAtivo );

  // Recupera informações do ativo para atualizar o estoque da Corretora
  const [assetInfo] = await investimentoModel.getAsset( CodAtivo );
  const newAssetStock = Number(assetInfo.QtdeAtivo - QtdeAtivo);
  await investimentoModel.updateAssetStock( newAssetStock, CodAtivo );

  // Recupera saldo Cliente para débito
  const [clientInfo] = await clienteModel.getClient( CodCliente );  
  const newClientBalance = Number(clientInfo.Saldo) - (Number(assetInfo.Valor) * QtdeAtivo);
  await clienteModel.decreaseClientBalance( newClientBalance, CodCliente );
}

export default {
  getAssets,
  getAssetById,
  buyAssets,
}