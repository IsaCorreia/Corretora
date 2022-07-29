import { ResultSetHeader } from "mysql2";
import IAsset from '../interfaces/IAsset';
import IClient from "../interfaces/IClient";
import connection from "./connection";

const getClient = async (CodCliente: number): Promise<IClient[]> => {
  const getQuery = `SELECT * FROM Corretora.Clientes WHERE CodCliente = ?;`;
  const [rows] = await connection.execute(getQuery, [CodCliente]);
  return rows as IClient[];
};

const addClient = async (
  NomeCliente: string,
  Senha: string
): Promise<ResultSetHeader> => {
  const addQuery = `INSERT INTO Corretora.Clientes(NomeCliente, Senha) VALUES(?, ?);`;
  const [result] = await connection.execute(addQuery, [NomeCliente, Senha]);
  return result as ResultSetHeader;
};

const getAssetsByClient = async (id: number): Promise<IAsset[]> => {
  const getAssetsQuery = `SELECT 
  AC.CodCliente, AC.CodAtivo, AC.QtdeAtivo, A.Valor
  FROM Corretora.Ativos_Cliente AS AC
  INNER JOIN Corretora.Ativos AS A
  ON AC.CodAtivo = A.CodAtivo
  WHERE AC.CodCliente = ?`;

  const [result] = await connection.execute(getAssetsQuery, [id]);
  return result as IAsset[];
};

const getBalance = async (id: number): Promise<IClient[]> => {
  const getQuery = `SELECT CodCliente, Saldo FROM Corretora.Clientes WHERE CodCliente = ?;`;
  const [rows] = await connection.execute(getQuery, [id]);
  return rows as IClient[];
};

const updateBalance = async (
  CodCliente: number,
  Valor: number
): Promise<ResultSetHeader> => {
  const updateQuery = `UPDATE Corretora.Clientes SET Saldo = ? WHERE CodCliente = ?;`;
  const [result] = await connection.execute(updateQuery, [Valor, CodCliente]);
  return result as ResultSetHeader;
};

export default {
  getClient,
  addClient,
  getAssetsByClient,
  getBalance,
  updateBalance,
};
