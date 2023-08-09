import { Appointment } from '../types/types';
import { readJson, writeJson } from '../dataHandler/dataHendler';
import check15Minutes from '../utils/check15Minutes';

// Editar consulta
// PUT: /query/:id
export default function editQuery(req: any, res: any) {
  let queries: Appointment[] = readJson('queries');

  const idx = queries.findIndex((u) => u.id === req.params.id);

  const { name, description, date, patient_id, doctor_id } = req.body;

  if (idx !== -1) {
    const payload: Appointment = {
      id: queries[idx].id,
      name: name || queries[idx].name,
      description: description || queries[idx].description,
      date: date || queries[idx].date,
      patient_id: patient_id || queries[idx].patient_id,
      doctor_id: doctor_id || queries[idx].doctor_id,
    };

    if (date) {
      if (check15Minutes(payload, queries)) {
        return res
          .status(400)
          .send(
            'Nova consulta deve estar dentro do intervalo de 15 minutos de consultas existentes.'
          );
      }
    }

    queries[idx] = payload;
    writeJson(queries, 'queries');
    res.status(200).send({
      description: 'Consulta atualizada com sucesso.',
      id: payload.id,
    });
  } else {
    return res.status(404).send('Consulta não encontrada');
  }
}
