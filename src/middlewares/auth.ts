import { readJson } from '../dataHandler/dataHendler';
import { Users } from '../types/types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey: string = process.env.SECRET_KEY || '';

export default function auth(req: any, res: any, next: any) {
  const users: Users[] = readJson('users');

  const { authorization } = req.headers;

  try {
    // Recebe o token pelo headers e decodifica com a secretkey
    const decodToken: any = jwt.verify(authorization, secretKey);

    // Compara usuarios, salvo/token
    const idx = users.findIndex((u) => u.name === decodToken.name);

    if (
      decodToken.name === users[idx].name &&
      decodToken.roles[0] === 'admin'
    ) {
      next();
    } else if (
      decodToken.name === users[idx].name &&
      decodToken.roles[0] === 'user'
    ) {
      return res.status(403).send('Acesso negado. Permissão insuficiente.');
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(401).send('Usuario não autorizado.');
  }
}
