import { Users } from '../types/types';
import { readJson } from '../dataHandler/dataHendler';

// Buscar doutor/paciente
// GET: /users/:id
export default function fetchUser(req: any, res: any) {
  const users: Users[] = readJson('users');

  const currentUser = users.find((u) => u.id === req.params.id);

  if (currentUser) {
    const user: { id: string; name: string } = {
      id: currentUser.id,
      name: currentUser.name,
    };

    return res.json(user);
  } else {
    return res.status(404).send('Paciente ou Doutor não encontrado.');
  }
}
