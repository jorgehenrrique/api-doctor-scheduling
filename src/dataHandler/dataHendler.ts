import fs from 'fs';
import path from 'path';
import { Users, Appointment } from '../types/types';

const usersPath = path.resolve(__dirname, '..', 'data', 'users.json');
const queriesPath = path.resolve(__dirname, '..', 'data', 'queries.json');

// Ler arquivos json
export function readJson(where: string): Users[] {
  try {
    if (where === 'users') {
      const content: string = fs.readFileSync(usersPath, 'utf8');
      return JSON.parse(content);
    } else if (where === 'queries') {
      const content: string = fs.readFileSync(queriesPath, 'utf8');
      return JSON.parse(content);
    } else {
      return [];
    }
  } catch (error) {
    console.log('Erro ao ler arquivo.');
    return [];
  }
}

// Escrever arquivos json
export function writeJson(
  content: Users[] | Appointment[],
  where: string
): void {
  try {
    if (where === 'users') {
      fs.writeFileSync(usersPath, JSON.stringify(content));
      console.log('Arquivo: users.json atualizado com sucesso.');
    } else if (where === 'queries') {
      fs.writeFileSync(queriesPath, JSON.stringify(content));
      console.log('Arquivo: queries.json atualizado com sucesso.');
    }
  } catch (error) {
    console.log('Erro ao gravar arquivo.');
  }
}
