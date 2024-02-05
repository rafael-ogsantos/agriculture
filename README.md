## Este desafio conste em criar uma API REST para o cadastro de produtores rurais.
## A API deve ser capaz de:
- Cadastrar um produtor
- Listar todos os produtores
- Listar um produtor por ID
- Atualizar um produtor
- Somar a área total de todas as fazendas de um produtor

## Para executar a aplicação, siga os passos abaixo:
- Clone o repositório
- Execute o comando `docker-compose up -d`
- Faça as migrações do banco de dados com o comando `knex migrate:latest`
- Acesse a API em `http://localhost:3001/api/producers`

## Para executar os testes, siga os passos abaixo:
### Testes de integração
- Execute o comando `npm run test:integration`
### Testes unitários
- Execute o comando `npm run test:unit`

## Os endpoints disponíveis são:
- POST /api/producers
- GET /api/producers
- GET /api/producers/:id
- PUT /api/producers/:id
- DELETE /api/producers/:id

## Observações e pontos de melhoria:

Como eu não tive muito tempo para desenvolver a aplicação, alguns pontos ficaram pendentes:
- Melhor componentização do front
- Melhor tratamento de erros
- Um formulário para cadastro de produtores via front


Bom. É isso. Obrigado pela oportunidade de fazer parte do processo seletivo de vocês! :D
