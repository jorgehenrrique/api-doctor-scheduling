import { Appointment } from '../types/types';

// Verifica o intervalo de 15 minutos entre as consultas
export default function check15Minutes(
  newQuery: Appointment,
  existingQueries: Appointment[]
): boolean {
  const newQueryDate = new Date(newQuery.date);

  for (const existingQuery of existingQueries) {
    const existingQueryDate = new Date(existingQuery.date);
    const timeDifference = Math.abs(
      newQueryDate.getTime() - existingQueryDate.getTime()
    );

    if (timeDifference <= 15 * 60 * 1000) {
      return true;
    }
  }

  return false;
}
