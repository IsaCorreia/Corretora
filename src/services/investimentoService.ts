import { Request } from "express";
import { UNPROCESSABLE_ENTITY } from 'http-status-codes';
import IAsset from "../interfaces/IAsset";
import IPurchase from "../interfaces/IPurchase";
import contaModel from "../models/contaModel";
import investimentoModel from "../models/investimentoModel";
import checkBalance from '../utils/checkBalance';
import HttpException from '../utils/HttpException';

const getAssets = async (): Promise<IAsset[]> => {
  const assets = await investimentoModel.getAllAssets();
  return assets;
};

const getAssetById = async (req: Request): Promise<IAsset> => {
  const { id } = req.params;
  const [asset] = await investimentoModel.getAsset(Number(id));
  return asset;
};

const buyAssets = async (req: Request): Promise<void> => {
  const { CodCliente, CodAtivo, QtdeAtivo } = req.body as IPurchase;
  // Recupera saldo Cliente e estoque de ativos
  const [assetInfo] = await investimentoModel.getAsset(CodAtivo);
  const [clientInfo] = await contaModel.getClient(CodCliente);
  
  const transactionValue: number = assetInfo.QtdeAtivo * QtdeAtivo;
  const canPurchase: boolean = await checkBalance( CodCliente, transactionValue );
  if ( !canPurchase ) throw new HttpException( UNPROCESSABLE_ENTITY, "Saldo insuficiente" );

  const newAssetStock = assetInfo.QtdeAtivo - QtdeAtivo;
  const newClientBalance =
  Number(clientInfo.Saldo) - transactionValue;
  await investimentoModel.updateAssetStock(newAssetStock, CodAtivo);
  await contaModel.updateBalance( newClientBalance, CodCliente );
  
  // Adiciona a compra ao registro
  const [purchaseInfo] = await investimentoModel.getPurchase(
    CodCliente,
    CodAtivo
  );
  if (purchaseInfo === undefined) {
    await investimentoModel.addPurchase(CodCliente, CodAtivo, QtdeAtivo);
  } else {
    const newPurchaseRegistry: number =
      Number(purchaseInfo.QtdeAtivo) + Number(QtdeAtivo);
    await investimentoModel.updatePurchase(
      CodCliente,
      CodAtivo,
      newPurchaseRegistry
    );
  }
};

const sellAssets = async (req: Request): Promise<void> => {
  const { CodCliente, CodAtivo, QtdeAtivo } = req.body as IPurchase;
  // Adiciona a compra ao registro
  const [purchaseInfo] = await investimentoModel.getPurchase(
    CodCliente,
    CodAtivo
  );
  const newPurchaseRegistry: number = purchaseInfo.QtdeAtivo - QtdeAtivo;
  await investimentoModel.updatePurchase(
    CodCliente,
    CodAtivo,
    newPurchaseRegistry
  );

  // Recupera informações do ativo para atualizar o estoque da Corretora
  const [assetInfo] = await investimentoModel.getAsset(CodAtivo);
  const newAssetStock: number = Number(assetInfo.QtdeAtivo) + Number(QtdeAtivo);
  await investimentoModel.updateAssetStock(newAssetStock, CodAtivo);

  // Recupera saldo Cliente para débito
  const [clientInfo] = await contaModel.getClient(CodCliente);
  const newClientBalance =
    Number(clientInfo.Saldo) + Number(assetInfo.Valor) * QtdeAtivo;
  await contaModel.updateBalance(newClientBalance, CodCliente);
};

export default {
  getAssets,
  getAssetById,
  buyAssets,
  sellAssets,
};
