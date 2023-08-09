import express from 'express';
import { v4 as idv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users, Patient, Doctor } from './types/types';
import { readJson, writeJson } from './dataHandler/dataHendler';
import auth from './middlewares/auth';
import checkTypes from './utils/checkTypes';

dotenv.config();
const secretKey: string = process.env.SECRET_KEY || '';

const app = express();
const port = 3333;

app.use(express.json());
app.listen(port, () => console.log('Server ativo port: ' + port));

// Logar usuario
// POST: /login
app.post('/login', loginUsers);

export function loginUsers(req: any, res: any) {
  const { id, name, crm, rg, pswd } = req.body;

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

// Listar usuarios pacientes e doutores
// GET: /users
app.get('/users', auth, listUsers);

export function listUsers(_: any, res: any) {
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
    res.json(users); // Retorna paciente/doutor, id/nome
  } else {
    res.status(404).send('Não há pacientes ou doutores cadastrados');
  }
}

// Adicionar usuarios pacientes e doutores
// POST: /users/add
app.post('/users/add', auth, addUsers);

export function addUsers(req: any, res: any) {
  const { name, crm, rg, pswd } = req.body;

  let newUser: Users;

  if (!checkTypes(req.body)) {
    return res.status(400).send('Tipos de dados inválidos');
  }

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
  } else if (crm?.trim()) {
    if (!name?.trim() || !pswd?.trim()) {
      return res
        .status(400)
        .send('Dados incompletos. Preencha todos os campos');
    }
    newUser = {
      id: idv4(),
      name: name,
      crm: crm,
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
}

// Editar Usuarios
// PUT: /users/:id
app.put('/users/:id', auth, editUsers);

export function editUsers(req: any, res: any) {
  let users: Users[] = readJson('users');

  const idx = users.findIndex((u) => u.id === req.params.id);

  const { name, crm, rg, pswd } = req.body;

  if (!checkTypes(req.body)) {
    return res.status(400).send('Tipos de dados inválidos');
  }

  if (idx !== -1) {
    if ('crm' in users[idx]) {
      console.log('É doutor');
      const payload: Doctor = {
        id: users[idx].id,
        name: name || users[idx].name,
        crm: crm || (users[idx] as Doctor).crm,
        pswd: pswd || (users[idx] as Doctor).pswd,
      };

      users[idx] = payload;
      writeJson(users, 'users');
      res.status(200).send('Dados atualizados com sucesso');
    } else if ('rg' in users[idx]) {
      console.log('É Paciente');
      const payload: Patient = {
        id: users[idx].id,
        name: name || users[idx].name,
        rg: rg || (users[idx] as Patient).rg,
      };

      users[idx] = payload;
      writeJson(users, 'users');
      res.status(200).send('Dados atualizados com sucesso');
    }
  } else {
    return res.status(404).send('Doutor ou paciente não encontrado');
  }
}
