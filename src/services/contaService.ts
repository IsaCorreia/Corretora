import { Request } from "express";
import IClient from "../interfaces/IClient";
import contaModel from "../models/contaModel";

const getBalance = async (req: Request): Promise<IClient> => {
  const { id } = req.params;
  const [balance] = await contaModel.getBalance(Number(id));
  return balance as IClient;
};

export default {
  getBalance,
};
