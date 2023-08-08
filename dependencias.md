# Dependências do projeto:

## Instalar o Express/ts:

`npm install express`

- TypeScript
  `npm install @types/express -D`

## Instalar pacode (fs) para gerenciar arquivos e manipular o .json:

`npm install fs`

## Instalar uuid (gera id unico):

`npm install uuid`

- Para typescript
  `npm i @types/uuid -D`

## Instalar Nodemon:

- Ele possibilita atualizar o servidor express, sem precisar parar e startar o 'node server.js', novamente.

`npm i nodemon --save-dev`

### Executar Nodemon:

- Alternativa um:

`npx nodemon server.js`

- Outra alternativa é configurar um script para o nodemon, no arquivo 'package.json':

```json
  "scripts": {
    "server": "nodemon src/server.ts"
  },
```

- Novo comando para rodar o nodemon:
  `npm run server`

Obs: 'server.js' é um nome de exemplo.
Obs: Se estiver em TypeScript, instale tbm o `ts-node`, para rodar o arquivo .ts
`npm i ts-node -D`

## Instalar JWT para gerar os tokens:

`npm i jsonwebtoken`

- Para typescript
  `npm i @types/jsonwebtoken -D`

## Instalar env/ts para guardar cheves:

`npm install dotenv`

- TypeScript
  `npm install @types/dotenv -D`
