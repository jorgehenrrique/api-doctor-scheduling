import { Users } from '../types/types';
import { readJson } from '../dataHandler/dataHendler';

export default function checkExistence(crm: string, rg: string): boolean {
  const users: Users[] = readJson('users');

  const isUser = users.find((u) => {
    if ('crm' in u) {
      return u.crm === crm;
    } else if ('rg' in u) {
      return u.rg === rg;
    }
    return false;
  });

  if (isUser) {
    return false;
  }
  return true;
}
