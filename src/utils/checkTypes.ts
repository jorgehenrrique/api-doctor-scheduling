import { Users } from '../types/types';

// Checa o tipo de dados
export default function checkTypes(user: Users): boolean {
  if ('crm' in user) {
    if (
      typeof user.name === 'string' &&
      typeof user.crm === 'string' &&
      typeof user.pswd === 'string'
    ) {
      return true;
    }
  } else if ('rg' in user) {
    if (typeof user.name === 'string' && typeof user.rg === 'string') {
      return true;
    }
  }

  return false;
}
