import { Users } from '../types/types';
import { readJson } from '../dataHandler/dataHendler';

// Listar usuarios pacientes e doutores
// GET: /users
export default function listUsers(_: any, res: any) {
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
