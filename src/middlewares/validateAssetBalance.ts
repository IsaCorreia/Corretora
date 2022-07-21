import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST } from "http-status-codes";
import IPurchase from "../interfaces/IPurchase";
import investimentoModel from "../models/investimentoModel";
import HttpException from "../utils/HttpException";

export default async function validateAssetBalance(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { CodCliente, CodAtivo, QtdeAtivo } = req.body as IPurchase;
  const [purchase] = await investimentoModel.getPurchase(CodCliente, CodAtivo);
  if (purchase === undefined || (purchase.QtdeAtivo === 0 || purchase.QtdeAtivo < QtdeAtivo)) {
    throw new HttpException(BAD_REQUEST, "Você não tem quantidade suficiente desse ativo para venda");
  }
  next();
}
