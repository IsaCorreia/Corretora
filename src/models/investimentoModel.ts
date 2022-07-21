import { ResultSetHeader } from "mysql2";
import IAsset from "../interfaces/IAsset";
import IPurchase from "../interfaces/IPurchase";
import connection from "./connection";

const getAllAssets = async (): Promise<IAsset[]> => {
  const getQuery = `SELECT * FROM Corretora.Ativos;`;
  const [ rows ] = await connection.execute( getQuery );
  return rows as IAsset[];
}

const getPurchase = async (
  CodCliente: number,
  CodAtivo: number
): Promise<IPurchase[]> => {
  const getQuery = `SELECT * FROM Corretora.Ativos_Cliente WHERE CodCliente = ? AND CodAtivo = ?;`;
  const [rows] = await connection.execute(getQuery, [CodCliente, CodAtivo]);
  return rows as IPurchase[];
};

const addPurchase = async (
  CodCliente: number,
  CodAtivo: number,
  QtdeAtivo: number
): Promise<ResultSetHeader> => {
  // Adicionar 'CodCliente','CodAtivo','QtdeAtivo' à 'Ativos_Cliente'
  const addQuery = `INSERT INTO Corretora.Ativos_Cliente(CodCliente, CodAtivo, QtdeAtivo) VALUES (?, ?, ?);`;
  const [ result ] = await connection.execute( addQuery, [ CodCliente, CodAtivo, QtdeAtivo ] );
  return result as ResultSetHeader;
}

const getAsset = async ( CodAtivo: number ): Promise<IAsset[]> => {
  const getQuery = `SELECT * FROM Corretora.Ativos WHERE CodAtivo = ?;`;
  const [rows] = await connection.execute( getQuery, [ CodAtivo ] );
  return rows as IAsset[];
}

const updateAssetStock = async ( QtdeAtivo: number, CodAtivo: number ): Promise<ResultSetHeader> => {
  const updateQuery = `UPDATE Corretora.Ativos SET QtdeAtivo = ? WHERE CodAtivo = ?;`;
  const [ result ] = await connection.execute( updateQuery, [ QtdeAtivo, CodAtivo ] );
  return result as ResultSetHeader;
}
export default {
  getAllAssets,
  getPurchase,
  addPurchase,
  getAsset,
  updateAssetStock,
}