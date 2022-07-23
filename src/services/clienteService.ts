import { Request } from "express";
import IAsset from "../interfaces/IAsset";
import clienteModel from "../models/clienteModel";

const getAssetsByClient = async (req: Request): Promise<IAsset[]> => {
  const { id } = req.params;
  const assets = await clienteModel.getAssetsByClient(Number(id));
  return assets as IAsset[];
};

export default {
  getAssetsByClient,
};
