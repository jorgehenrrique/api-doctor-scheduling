import { Users, Appointment } from '../types/types';
import { v4 as idv4 } from 'uuid';
import { readJson, writeJson } from '../dataHandler/dataHendler';
import check15Minutes from '../utils/check15Minutes';

// Adicionar consulta
// POST: /query
export default function addQuery(req: any, res: any) {
  const users: Users[] = readJson('users');
  const { name, description, date, patient_id, doctor_id } = req.body;

  if (
    !name?.trim() ||
    !description?.trim() ||
    !date?.trim() ||
    !patient_id?.trim() ||
    !doctor_id.trim()
  ) {
    return res.status(400).send('Dados imcompletos, preencha todos os campos.');
  }

  const patientId = users.find((user) => {
    if ('rg' in user) return user.id === patient_id;
    return false;
  });
  const doctorId = users.find((user) => {
    if ('crm' in user) return user.id === doctor_id;
    return false;
  });

  if (!doctorId || !patientId) {
    return res.status(400).send('ID de paciente ou médico incorreto.');
  }

  const newQuery: Appointment = {
    id: idv4(),
    name: name,
    description: description,
    date: date,
    patient_id: patient_id,
    doctor_id: doctor_id,
  };

  const queries: Appointment[] = readJson('queries');

  if (check15Minutes(newQuery, queries)) {
    return res
      .status(400)
      .send(
        'Nova consulta deve estar dentro do intervalo de 15 minutos de consultas existentes.'
      );
  }

  queries.push(newQuery);

  writeJson(queries, 'queries');
  console.log('Consulta criada');
  return res.status(201).send({
    description: 'Consulta criada com sucesso.',
    id: newQuery.id,
  });
}
