import express from 'express';
import { v4 as idv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users, Patient, Doctor } from './types/types';
import { readJson, writeJson } from './dataHandler/dataHendler';
import auth from './middlewares/auth';

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

// Listar usuarios
// GET: /users
app.get('/users', auth, (req, res) => {
  const usersList: Users[] = readJson('users');

  if (usersList.length > 0) {
    const users: { id: string; name: string }[] = [];

    for (const user of usersList) {
      if (user.name === 'admin') {
        continue;
      } else {
        const { id, name } = user;

        users.push({ id, name });
      }
    }
    res.json(users); // Retorna usuarios, id/nome
  } else {
    res.status(404).send('Sem usuarios cadastrados');
  }
});

// Adicionar usuarios
// POST: /users/add
app.post('/users/add', auth, (req, res) => {
  const { name, cnh, rg, pswd } = req.body;

  let newUser: Users;

  // Coalescência nula (?.)
  if (rg?.trim()) {
    if (!name.trim()) {
      return res
        .status(400)
        .send('Dados incompletos. Preencha todos os campos');
    }
    newUser = {
      id: idv4(),
      name: name,
      rg: rg,
    };
  } else if (cnh?.trim()) {
    if (!name?.trim() || !pswd?.trim()) {
      return res
        .status(400)
        .send('Dados incompletos. Preencha todos os campos');
    }
    newUser = {
      id: idv4(),
      name: name,
      cnh: cnh,
      pswd: pswd,
    };
  } else {
    return res
      .status(400)
      .send('Dados inválidos. Forneça informações corretas.');
  }

  const users: Users[] = readJson('users');
  users.push(newUser);

  writeJson(users, 'users');
  console.log('Usuario criado com sucesso');
  res.status(201).send('Usuario adicionado com sucesso.');
});
