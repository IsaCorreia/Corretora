import connection from './connection';

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