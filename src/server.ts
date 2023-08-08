import express from 'express';
import { v4 as idv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users, Patient, Doctor } from './types/types';
import { readJson } from './dataHandler/dataHendler';

dotenv.config();
const secretKey: string = process.env.SECRET_KEY || '';

const app = express();
const port = 3333;

app.use(express.json());
app.listen(port, () => console.log('Server ativo port: ' + port));

// Logar usuario
// POST: /login
app.post('/login', (req, res) => {
  const { id, name, cnh, rg, pswd } = req.body;

  // users ou queries
  const users: Users[] = readJson('users');
  const currentUser = users.find((u) => u.name === name);

  if (currentUser) {
    if ('cnh' in currentUser) {
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
});
