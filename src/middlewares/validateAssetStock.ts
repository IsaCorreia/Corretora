import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "http-status-codes";
import IPurchaseRequest from "../interfaces/IPurchaseRequest";
import investimentoModel from "../models/investimentoModel";

export default async function validateAssetStock(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { CodAtivo, QtdeAtivo } = req.body as IPurchaseRequest;
  const [asset] = await investimentoModel.getAsset(Number(CodAtivo));
  if ( asset === undefined ) {
    return res.status( BAD_REQUEST ).json( "O ativo solicitado não existe" );
  }
  if (asset && (asset.QtdeAtivo === 0 || asset.QtdeAtivo < QtdeAtivo)){
    return res
      .status(BAD_REQUEST)
      .json(
        `O ativo '${asset.NomeAtivo}' não tem quantidade suficiente disponível`
      );}
  next();
}
