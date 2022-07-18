import IClient from '../interfaces/IClient';
import connection from './connection';

const getClient = async ( CodCliente: number ): Promise<IClient[]> => {
  const getQuery = `SELECT * FROM Corretora.Clientes WHERE CodCliente = ?;`;
  const [ rows ] = await connection.execute( getQuery, [ CodCliente ] );
  return rows as IClient[];
}

const getAssetsByClient = async( id: number ) => {
  const getAssetsQuery = `SELECT 
  AC.CodCliente, AC.CodAtivo, AC.QtdeAtivo, A.Valor
  FROM Corretora.Ativos_Cliente AS AC
  INNER JOIN Corretora.Ativos AS A
  ON AC.CodAtivo = A.CodAtivo
  WHERE AC.CodCliente = ?`;

  const [ result ] = await connection.execute( getAssetsQuery, [ id ] );
  return result
}

export default {
  getAssetsByClient
}