import { ResultSetHeader } from 'mysql2';
import IAsset from '../interfaces/IAsset';
import connection from './connection';

const addPurchase = async ( CodCliente: number, CodAtivo: number, QtdeAtivo: number ): Promise<ResultSetHeader> => {
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

export default {
  addPurchase,
  getAsset,
}