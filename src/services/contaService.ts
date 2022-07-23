import { Request } from "express";
import IClient from "../interfaces/IClient";
import contaModel from "../models/contaModel";

const getBalance = async (req: Request): Promise<IClient> => {
  const { id } = req.params;
  const [balance] = await contaModel.getBalance(Number(id));
  return balance as IClient;
};

const deposit = async (req: Request): Promise<void> => {
  const { CodCliente, Valor } = req.body;
  const [{ Saldo }] = await contaModel.getBalance(Number(CodCliente));
  const deposit: number = Number(Saldo) + Number(Valor);
  await contaModel.updateBalance(CodCliente, deposit);
};

const withdraw = async (req: Request): Promise<void> => {
  const { CodCliente, Valor } = req.body;
  const [{ Saldo }] = await contaModel.getBalance(Number(CodCliente));
  const deposit: number = Number(Saldo) - Number(Valor);
  await contaModel.updateBalance(CodCliente, deposit);
};

export default {
  getBalance,
  deposit,
  withdraw,
};
