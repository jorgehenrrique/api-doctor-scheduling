import { Users } from '../types/types';
import { readJson } from '../dataHandler/dataHendler';

export default function checkExistence(crm: string, rg: string): boolean {
  const users: Users[] = readJson('users');

  const isUser = users.find((user) => {
    if ('crm' in user) {
      return user.crm === crm;
    } else if ('rg' in user) {
      return user.rg === rg;
    }
    return false;
  });

  if (isUser) {
    return false;
  }
  return true;
}
