import { Users } from '../types/types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { readJson } from '../dataHandler/dataHendler';

dotenv.config();
const secretKey: string = process.env.SECRET_KEY || '';

// Logar
// POST: /login
export default function loginUsers(req: any, res: any) {
  const { name, pswd } = req.body;

  const users: Users[] = readJson('users');
  const currentUser = users.find((u) => u.name === name);

  if (currentUser) {
    if ('crm' in currentUser) {
      if (currentUser.pswd === pswd) {
        const user = {
          id: currentUser.id,
          name: currentUser.name,
          roles: ['admin'],
        };

        const token = jwt.sign(user, secretKey, { expiresIn: '5h' });
        console.log('Doutor logado com sucesso');
        return res.json({ token });
      }
    }
    if ('rg' in currentUser) {
      const user = {
        id: currentUser.id,
        name: currentUser.name,
        roles: ['user'],
      };

      const token = jwt.sign(user, secretKey, { expiresIn: '5h' });
      console.log('Paciente logado com sucesso');
      return res.json({ token });
    }
  }
  res.status(401).send('Usuario ou senha inválidos');
}
