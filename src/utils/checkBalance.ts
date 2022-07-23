import contaModel from '../models/contaModel';

export default async function checkBalance(id:number, value:number): Promise<boolean> {
  const [{Saldo}] = await contaModel.getBalance(Number(id));
  return (Number( value ) <= Number(Saldo)) as boolean;
}