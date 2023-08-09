import express from 'express';
import dotenv from 'dotenv';
import auth from './middlewares/auth';
import editUsers from './controllers/editUsers';
import addUsers from './controllers/addUsers';
import listUsers from './controllers/listUsers';
import loginUsers from './controllers/loginUsers';
import deleteUsers from './controllers/deleteUsers';
import fetchUser from './controllers/fetchUser';
import addQuery from './controllers/addQuery';
import fetchQuery from './controllers/fetchQuery';
import listQuery from './controllers/listQuery';
import deleteQuery from './controllers/deleteQuery';
import editQuery from './controllers/editQuery';

dotenv.config();
const secretKey: string = process.env.SECRET_KEY || '';

const app = express();
const port = 3333;

app.use(express.json());
app.listen(port, () => console.log('Server ativo port: ' + port));

// Logar usuario
// POST: /login
app.post('/login', loginUsers);

// Buscar doutor/paciente
// GET: /users/:id
app.get('/users/:id', auth, fetchUser);

// Listar usuarios pacientes e doutores
// GET: /users
app.get('/users', auth, listUsers);

// Adicionar usuarios pacientes e doutores
// POST: /users/add
app.post('/users/add', auth, addUsers);

// Editar Usuarios
// PUT: /users/:id
app.put('/users/:id', auth, editUsers);

// Deletar paciente/doutor
// DELETE: /users/:id
app.delete('/users/:id', auth, deleteUsers);

// CONSULTAS

// Adicionar consulta
// POST: /query
app.post('/query', auth, addQuery);

// Buscar consulta
// GET: /query/:id
app.get('/query/:id', auth, fetchQuery);

// Listar consultas
// GET: /query
app.get('/query', auth, listQuery);

// Deletar consulta
// DELETE: /query/:id
app.delete('/query/:id', auth, deleteQuery);

// Editar consulta
// PUT: /query/:id
app.put('/query/:id', auth, editQuery);
