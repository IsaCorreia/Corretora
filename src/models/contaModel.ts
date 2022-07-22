import IClient from '../interfaces/IClient';
import connection from './connection';

const getBalance = async ( id: number ): Promise<IClient[]> => {
  const getQuery = `SELECT * FROM Corretora.Clientes WHERE CodCliente = ?;`;
  const [ rows ] = await connection.execute( getQuery, [ id ] );
  return rows as IClient[];
}

export default { getBalance }