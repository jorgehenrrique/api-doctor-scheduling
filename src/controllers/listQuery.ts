import { Appointment } from '../types/types';
import { readJson } from '../dataHandler/dataHendler';

// Listar consultas
// GET: /query
export default function listQuery(_: any, res: any) {
  const queries: Appointment[] = readJson('queries');

  if (queries.length > 0) {
    return res.json(queries); // Retorna consultas
  } else {
    return res.status(404).send('Não há consultas cadastradas.');
  }
}
