import express from 'express';
import { v4 as idv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Users, Patient, Doctor } from './types/types';
import { readJson, writeJson } from './dataHandler/dataHendler';
import auth from './middlewares/auth';
import checkTypes from './utils/checkTypes';
import { editUsers } from './controllers/editUsers';
import { addUsers } from './controllers/addUsers';
import { listUsers } from './controllers/listUsers';
import { loginUsers } from './controllers/loginUsers';

dotenv.config();
const secretKey: string = process.env.SECRET_KEY || '';

const app = express();
const port = 3333;

app.use(express.json());
app.listen(port, () => console.log('Server ativo port: ' + port));

// Logar usuario
// POST: /login
app.post('/login', loginUsers);

// Listar usuarios pacientes e doutores
// GET: /users
app.get('/users', auth, listUsers);

// Adicionar usuarios pacientes e doutores
// POST: /users/add
app.post('/users/add', auth, addUsers);

// Editar Usuarios
// PUT: /users/:id
app.put('/users/:id', auth, editUsers);
