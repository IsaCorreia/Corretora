import { NextFunction, Request, Response } from "express";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import contaModel from "../models/contaModel";
import HttpException from "../utils/HttpException";

export default async function validateAccountBalance(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { CodCliente, Valor } = req.body;
  const [{Saldo}] = await contaModel.getBalance(Number(CodCliente));
  if (Number(Saldo) < Valor)
    throw new HttpException(UNPROCESSABLE_ENTITY, "Saldo insuficiente");
  next();
}
