import { ResultSetHeader } from "mysql2";

const getBalance = async ( id: number ): Promise<IClient[]> => {
  const getQuery = `SELECT * FROM Corretora.Clientes WHERE CodCliente = ?;`;
  const [ rows ] = await connection.execute( getQuery, [ id ] );
  return rows as IClient[];

const updateBalance = async (
  CodCliente: number,
  Valor: number
): Promise<ResultSetHeader> => {
  const updateQuery = `UPDATE Corretora.Clientes SET Saldo = ? WHERE CodCliente = ?;`;
  const [result] = await connection.execute(updateQuery, [Valor, CodCliente]);
  return result as ResultSetHeader;
};

export default { getBalance, updateBalance };

export default { getBalance }