import 'dotenv/config';
import { sign } from 'jsonwebtoken';

export default function createToken ( NomeCliente: string ): string {
  const token = sign( { data: NomeCliente }, process.env.JWT_SECRET! );
  return token;
}