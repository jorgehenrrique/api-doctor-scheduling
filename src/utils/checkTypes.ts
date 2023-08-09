import { Users, Doctor, Patient } from '../types/types';

// Checa o tipo de dados
export default function checkTypes(user: Users): boolean {
  if ('crm' in user) {
    const doctorUser = user as Doctor;
    if (
      typeof doctorUser.name !== 'string' ||
      typeof doctorUser.crm !== 'string'
    ) {
      return false;
    }
  } else if ('rg' in user) {
    const patientUser = user as Patient;
    if (
      typeof patientUser.name !== 'string' ||
      typeof patientUser.rg !== 'string'
    ) {
      return false;
    }
  } else if ('name' in user) {
    const patientUser = user as Patient;
    if (typeof patientUser.name !== 'string') {
      return false;
    }
  }

  return true;
}
