import { Users } from '../types/types';
import { readJson, writeJson } from '../dataHandler/dataHendler';

// Deletar usuario
// DELETE: /users/:id
export default function deleteUsers(req: any, res: any) {
  let users: Users[] = readJson('users');

  const currentUser = users.find((u) => u.id === req.params.id);

  if (currentUser) {
    users = users.filter((u) => u.id !== req.params.id);
    writeJson(users, 'users');
    return res.status(200).send('Deletado com sucesso');
  } else {
    return res.status(404).send(`Não há dados com o id: ${req.params.id}`);
  }
}
