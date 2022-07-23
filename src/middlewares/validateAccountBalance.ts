import { NextFunction, Request, Response } from "express";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";
import checkBalance from '../utils/checkBalance';
import HttpException from "../utils/HttpException";

export default async function validateAccountBalance(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const { CodCliente, Valor } = req.body;
  const canPurchase: boolean = await checkBalance( CodCliente, Valor );
  if ( !canPurchase ) throw new HttpException( UNPROCESSABLE_ENTITY, "Saldo insuficiente" );
  next();
}
