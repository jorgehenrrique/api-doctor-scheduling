import { Users } from '../types/types';
import checkTypes from '../utils/checkTypes';
import { v4 as idv4 } from 'uuid';
import { readJson, writeJson } from '../dataHandler/dataHendler';

// Adicionar usuarios pacientes e doutores
// POST: /users/add
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
