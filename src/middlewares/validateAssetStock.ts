import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "http-status-codes";
import IPurchase from "../interfaces/IPurchase";
import investimentoModel from "../models/investimentoModel";
import HttpException from "../utils/HttpException";

export default async function validateAssetStock(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { CodAtivo, QtdeAtivo } = req.body as IPurchase;
  const [asset] = await investimentoModel.getAsset(Number(CodAtivo));
  if (asset === undefined) {
    throw new HttpException(BAD_REQUEST, "O ativo solicitado não existe");
  }
  if (asset && (asset.QtdeAtivo === 0 || asset.QtdeAtivo < QtdeAtivo)) {
    throw new HttpException(
      BAD_REQUEST,
      `O ativo '${asset.NomeAtivo}' não tem quantidade suficiente disponível`
    );
  }
  next();
}
