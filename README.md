# Projeto Full-Stack com React, Node.js e MySQL

Este é o repositório do teste técnico full-stack jr da Shopper, que inclui o front-end desenvolvido em React e o back-end em Node.js, com um banco de dados MySQL usando Docker Compose.

## Pré-requisitos

Antes de começar, certifique-se de que você tenha instalado:

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração

1. Clone este repositório:

```bash
git clone https://github.com/leomartins1/shopper-fullstack/
```

2. Instale as dependências do front-end:
```bash
cd frontend
yarn
```

3. Instale as dependências do back-end:
```bash
cd backend
yarn
```

4. Executando o Projeto

Front-End (React)

Para iniciar o servidor de desenvolvimento do front-end:

```bash
cd frontend
yarn dev
```

O front-end estará disponível em http://localhost:3000.

Back-End (Node.js)

Certifique-se de que o Docker esteja em execução. Em seguida, inicie o Docker Compose para o MySQL:

```bash
cd backend
docker-compose up -d
```

Para iniciar o servidor de desenvolvimento do back-end:

```bash
cd backend
yarn start
```
O back-end estará disponível em http://localhost:4000.
