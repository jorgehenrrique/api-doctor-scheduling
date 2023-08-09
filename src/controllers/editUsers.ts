import { Users, Doctor, Patient } from '../types/types';
import { readJson, writeJson } from '../dataHandler/dataHendler';
import checkTypes from '../utils/checkTypes';
import checkExistence from '../utils/checkExistence';

// Editar Usuarios
// PUT: /users/:id
export default function editUsers(req: any, res: any) {
  let users: Users[] = readJson('users');

  const idx = users.findIndex((u) => u.id === req.params.id);

  const { name, crm, rg, pswd } = req.body;

  if (!checkTypes(req.body)) {
    return res.status(400).send('Tipos de dados inválidos');
  }

  if (!checkExistence(crm, rg)) {
    return res.status(400).send('CRM ou RG já existe');
  }

  if (idx !== -1) {
    if ('crm' in users[idx]) {
      const payload: Doctor = {
        id: users[idx].id,
        name: name || users[idx].name,
        crm: crm || (users[idx] as Doctor).crm,
        pswd: pswd || (users[idx] as Doctor).pswd,
      };

      users[idx] = payload;
      writeJson(users, 'users');
      res.status(200).send({
        description: 'Dados atualizados com sucesso.',
        id: payload.id,
      });
    } else if ('rg' in users[idx]) {
      const payload: Patient = {
        id: users[idx].id,
        name: name || users[idx].name,
        rg: rg || (users[idx] as Patient).rg,
      };

      users[idx] = payload;
      writeJson(users, 'users');
      res.status(200).send({
        description: 'Dados atualizados com sucesso.',
        id: payload.id,
      });
    }
  } else {
    return res.status(404).send('Doutor ou paciente não encontrado');
  }
}
