# Documentação de consumo da API de Agendamento de Consultas

Uma API simples para agendamento de consultas médicas, com suporte a usuários (médicos e pacientes) e consultas.

API desenvolvida em TypeScript, com as seguintes funcionalidades:

- Cadastro, edição e exclusão de médicos e pacientes
- Agendamento, consulta e exclusão de consultas
- Autenticação via login

Todas as rotas estão protegidas por JWT para autenticação.

## Tecnologias utilizadas

- JSON Web Tokens (JWT)
- TypeScript
- Express
- dotenv
- uuid
- fs

## Entidades

### Médico

- id
- nome
- CRM
- senha

### Paciente

- id
- nome
- RG

### Consulta

- id
- nome
- descrição
- data
- id do paciente
- id do médico

### Como Usar

1. **Instalação**

   Clone este repositório e navegue até a pasta do projeto:

   ```
   git clone https://github.com/seu-usuario/api-doctor-scheduling.git
   cd api-doctor-scheduling
   ```

   Instale as dependências do projeto:

   ```
   npm install
   ```

2. **Configuração do ambiente**

   Crie um arquivo `.env` na raiz do projeto e defina suas variáveis de ambiente, por exemplo:

   ```
   SECRET_KEY=seu-segredo-aqui
   ```

3. **Iniciar o Servidor**

   Para iniciar o servidor, execute:

   ```
   npm run server
   ```

   O servidor estará disponível em http://localhost:3333.

4. **Endpoints da API**

   - `POST /login`: Realiza o login de um usuário.
   - `GET /users/:id`: Busca informações de um usuário (requer autenticação).
   - `GET /users`: Lista todos os usuários (requer autenticação).
   - `POST /users/add`: Adiciona um novo usuário (requer autenticação).
   - `PUT /users/:id`: Edita informações de um usuário (requer autenticação).
   - `DELETE /users/:id`: Remove um usuário (requer autenticação).
   - `POST /query`: Cria uma nova consulta (requer autenticação).
   - `GET /query/:id`: Busca informações de uma consulta (requer autenticação).
   - `GET /query`: Lista todas as consultas (requer autenticação).
   - `DELETE /query/:id`: Remove uma consulta (requer autenticação).
   - `PUT /query/:id`: Edita informações de uma consulta (requer autenticação).

5. **Tipos de Dados**

   - `Doctor`: Representa um médico com `id`, `name`, `crm` e `pswd`.
   - `Patient`: Representa um paciente com `id`, `name` e `rg`.
   - `Users`: Pode ser um `Doctor` ou `Patient`.
   - `Appointment`: Representa uma consulta com `id`, `name`, `description`, `date`, `patient_id` e `doctor_id`.

6. **Autenticação**

   Muitos endpoints requerem autenticação. Para isso, inclua o token JWT no header de autorização das requisições.

7. **Exemplos de Uso**

## Rotas

### O servidor estará disponível em http://localhost:3333

## Autenticação

A primeira etapa é realizar o login para obter o token JWT, que deverá ser incluído em todas as demais requisições.

**URL:** `/login`

**Método:** `POST`

**Corpo da requisição:**

```json
// Doutor
{
  "name": "usuario",
  "pswd": "senha123"
}
// Ou
// Paciente
{
  "name": "Maria"
}
```

**Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNiIsIm5hbWUiOiJKb2FvIn0sImlhdCI6MTY0ODgzNjkzM30.FwioGSfHby1QII5zZ-Hxf-DUpCtT2I7DWchNiA9PFOs"
}
```

Salvar o token recebido para incluir nos headers das demais requisições.

## Médicos e Pacientes

### Listar

**URL:** `/users`

**Método:** `GET`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Listar por ID

**URL:** `/users/id`

**Método:** `GET`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Cadastrar

**URL:** `/users/add`

**Método:** `POST`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Corpo:**

```json
//   Doutor
  {
    "name": "User02",
    "crm": "1122.2211",
    "pswd": "1234"
  }
// ou
// Paciente
  {
    "name": "User01",
    "rg": "444-333"
  }
```

---

### Editar

**URL:** `/users/id`

**Método:** `PUT`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Corpo:**

```json
//   Doutor
  {
    "name": "User02",
    "crm": "1122.2211",
    "pswd": "1234"
  }
// ou
// Paciente
  {
    "name": "User01",
    "rg": "444-333"
  }
```

---

### Deletar

**URL:** `/users/id`

**Método:** `DELETE`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Consultas

### Cadastrar consulta

**URL:** `/query`

**Método:** `POST`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Corpo:**

```json
{
  "name": "Exame",
  "description": "Rotina",
  "date": "10-10-2013 15:30:00",
  "patient_id": "e4797064-ebd1-45d0-a415-6a31b0045cbb",
  "doctor_id": "ab03748c-f3d1-46c7-81d7-35e6d6ca71cf"
}
```

---

### Listar consultas

**URL:** `/query`

**Método:** `GET`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Listar consulta por ID

**URL:** `/query/id`

**Método:** `GET`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Deletar consulta

**URL:** `/query/id`

**Método:** `DELETE`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Editar consulta

**URL:** `/query/id`

**Método:** `PUT`

**Headers:**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Corpo:**

```json
{
  "name": "Exame",
  "description": "Rotina",
  "date": "10-10-2013 15:30:00",
  "patient_id": "e4797064-ebd1-45d0-a415-6a31b0045cbb",
  "doctor_id": "ab03748c-f3d1-46c7-81d7-35e6d6ca71cf"
}
```

## Como testar

É possível testar a API utilizando ferramentas como Insomnia ou Postman.
Lembrando de incluir o token JWT obtido na rota de login nas demais requisições que necessitam de autenticação.

Espero que esta documentação ajude no entendimento e consumo dos endpoints da API! Caso tenha dúvidas, entre em contato.
