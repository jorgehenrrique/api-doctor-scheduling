# Sistema de agendamento de Consulta

- Criar api/rest que implemente um sistema básico de consulta na qual teremos 3 entidades principais, médico, cliente e consulta. Aplique validação de entrada de dados, responses adequados para cada tipo de chamada de api.

- O consumidor deve ser capaz de cadastrar médicos e pacientes e agendar consultas. Deve ser entregue algum tipo de documentação para consumo da api , pode ser um readme ou dados de postman ou de algum software para manipulação de api.

## Entidade Médico(doctor)

- Api deve ser capaz de listar, criar, editar um médico. Todos os dados são obrigatórios para criar um médico.

**Estrutura de dados**

```js
{
id: "1023-lds-232l2V2" / uuid
name: "doctor xy lot",
crm: "12012200323223"
}
```

## Entidade Paciente (patient)

- Api deve ser capaz de listar, criar, editar, um paciente.Todos os dados são obrigatórios para criar um paciente.

```js
{
id: "1023-lds-232l2TX"
name: "paciente",
rg: "44444444444"
}
```

## Entidade Consulta(Appointment)

- Api deve ser capaz de listar, criar, editar, uma consulta. Todos os dados são obrigatórios para criar uma consulta.

```js
{
id: “02320324”,
name: “checkup”,
description: “21223232”,
date: “11-10-2023 11:15:00”,
patient_id: “1023-lds-232l2V2”,
doctor_id: “1023-lds-232l2TX”
}
```

### Desafios Extras

Aplique as seguintes validações para melhorar api

- CRM do médico deve ser único no sistema não pode permitir um cadastro de um CRM que já existe.
- Um médico não pode ter mais de uma consulta no mesmo horário , aplique intervalo de 15 minutos de espaço entre as consultas agendadas com mesmo médico exemplo se doutor tem uma consulta agendada para às 10:00 nao podemos marcar nenhuma consulta em intervalo de tempo de 09:45 às 10:15
- Somente médicos podem agendar consultas, criar fluxo de login (crm, senha) que devolva um token jwt do médico logado e use para validação operações da entidade de consulta.
