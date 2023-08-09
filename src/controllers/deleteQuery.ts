import { Appointment } from '../types/types';
import { readJson, writeJson } from '../dataHandler/dataHendler';

// Deletar consulta
// DELETE: /query/:id
export default function deleteQuery(req: any, res: any) {
  let queries: Appointment[] = readJson('queries');

  const currentQuery = queries.find((u) => u.id === req.params.id);

  if (currentQuery) {
    queries = queries.filter((u) => u.id !== req.params.id);
    writeJson(queries, 'queries');
    return res.status(200).send('Consulta deletada com sucesso');
  } else {
    return res.status(404).send(`Não há dados com o id: ${req.params.id}`);
  }
}
