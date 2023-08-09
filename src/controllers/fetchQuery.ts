import { Appointment } from '../types/types';
import { readJson } from '../dataHandler/dataHendler';

// Buscar consulta
// GET: /query/:id
export default function fetchQuery(req: any, res: any) {
  const queries: Appointment[] = readJson('queries');

  const currentQuery = queries.find((query) => query.id === req.params.id);

  if (currentQuery) {
    return res.json(currentQuery);
  } else {
    return res.status(404).send('Consulta não encontrada.');
  }
}
