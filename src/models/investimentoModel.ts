import { ResultSetHeader } from 'mysql2';
import connection from './connection';

const addPurchase = async ( CodCliente: number, CodAtivo: number, QtdeAtivo: number ): Promise<ResultSetHeader> => {
  // Adicionar 'CodCliente','CodAtivo','QtdeAtivo' à 'Ativos_Cliente'
  const addQuery = `INSERT INTO Corretora.Ativos_Cliente(CodCliente, CodAtivo, QtdeAtivo) VALUES (?, ?, ?);`;
  const [ result ] = await connection.execute( addQuery, [ CodCliente, CodAtivo, QtdeAtivo ] );
  return result as ResultSetHeader;
}

export default {
  addPurchase,
}