<p align="center"><img src="./docs/assets/pokelogo.png" alt="logo"></p>

![last commit](https://img.shields.io/github/last-commit/christophermontero/pokeapi)
![license](https://img.shields.io/github/license/christophermontero/pokeapi)
![build](https://img.shields.io/github/actions/workflow/status/christophermontero/pokeapi/pipeline.yml)
![repo size](https://img.shields.io/github/repo-size/christophermontero/pokeapi)
![watchers](https://img.shields.io/github/watchers/christophermontero/pokeapi?style=social)

# Poke API

- [Project description](#project-description)
  - [Features](#features)
  - [Architecture](#architecture)
    - [Use case diagram](#use-case-diagram)
    - [Component diagram](#component-diagram)
    - [Deployment diagram](#deployment-diagram)
  - [Endpoints](#endpoints)
  - [MongoDB documents structure](#mongodb-documents-structure)
- [User guide](#user-guide)
- [Requeriments](#requeriments)
- [Install guide](#install-guide)
  - [Containers](#containers)
- [Comments](#comments)
- [License](#license)
- [Author](#author)

## Project description

Poke API is a comprehensive RESTful API designed to provide detailed information about Pokémon. It offers a wide range of data, including but not limited to, Pokémon characteristics, abilities, and statistics. This API is perfect for developers building applications that require Pokémon data.

### Features
- Comprehensive Pokémon Data: Access detailed information on Pokémon species, abilities, moves, and types.

### Architecture

#### Use case diagram

![use case diagram](./docs/assets/diagrams/usecase.png)

#### Component diagram

![component diagram](./docs/assets/diagrams/component.png)

#### Deployment diagram

![deployment diagram](./docs/assets/diagrams/deployment.png)

### Endpoints

```
* Auth:
  * POST /api/v1/auth/signup
  * POST /api/v1/auth/signin
  * GET /api/v1/auth/signout
  * GET /api/v1/auth/me
* Pokemon:
  * GET /api/v1/pokemon
  * GET /api/v1/pokemon/:name
```

### MongoDB documents structure

- Trainer:
  - email: string,
  - name: string,
  - nickname: string,
  - password: string,
  - team: string
  - createdAt: date
  - lastConnection: date

## User guide

Describe the project structure and how to use it.

```bash
.
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── docker-compose.yml
├── Dockerfile
├── docs
│   ├── assets
│   │   ├── diagrams
│   │   │   ├── component.png
│   │   │   ├── deployment.png
│   │   │   └── usecase.png
│   │   └── pokelogo.png
│   └── poke-api-doc-v1.json
├── ecosystem.config.js
├── jest.config.ts
├── LICENSE
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   │   ├── config.ts
│   │   ├── logger.ts
│   │   └── morgan.ts
│   ├── constants
│   │   └── responses.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   └── pokemon.controller.ts
│   ├── entities
│   │   └── Trainer.ts
│   ├── index.ts
│   ├── interfaces
│   │   ├── pokemon.ts
│   │   └── trainer.ts
│   ├── middlewares
│   │   ├── error.ts
│   │   ├── hashing.ts
│   │   ├── rateLimiter.ts
│   │   ├── token.ts
│   │   └── validate.ts
│   ├── routes
│   │   └── v1
│   │       ├── auth.route.ts
│   │       ├── index.ts
│   │       └── pokemon.route.ts
│   ├── services
│   │   ├── pokemon.service.ts
│   │   └── trainer.service.ts
│   ├── utils
│   │   ├── ApiError.ts
│   │   ├── jwt.ts
│   │   ├── pick.ts
│   │   └── pokemon.ts
│   └── validators
│       ├── auth.validator.ts
│       └── pokemon.validator.ts
├── tests
│   ├── integration
│   │   ├── auth.spec.ts
│   │   └── pokemon.spec.ts
│   ├── unit
│   │   ├── entities
│   │   │   └── trainer.model.test.ts
│   │   └── middlewares
│   │       ├── error.test.ts
│   │       ├── hashing.test.ts
│   │       ├── token.test.ts
│   │       └── validate.test.ts
│   └── utils
│       └── setupTest.ts
└── tsconfig.json
```

To see the documentation must be run the application in development mode and open this link [documentation](http://localhost:3000/api/v1/docs/)

Link to demo [here](https://awesomepokeapi-ae9d4e3e043d.herokuapp.com/)

## Requeriments

- Node.js version 18 or higher [Node.js](https://nodejs.org/en/)
- NPM version 8 or higher [NPM](https://www.npmjs.com/)
- MongoDB version 4 or higher [MongoDB](https://www.mongodb.com/)
- Docker engine version 24.0.7 or higher [Docker](https://docs.docker.com/desktop/?_gl=1*1fjyumz*_ga*MzM2Mzg0MjQzLjE3MDIxNDI5Mjc.*_ga_XJWPQMJYHQ*MTcwNDM4Nzk5NS41LjEuMTcwNDM4ODAwNy40OC4wLjA.)
- Docker compose version 2.21.0 or higher [Docker compose](https://docs.docker.com/desktop/?_gl=1*1fjyumz*_ga*MzM2Mzg0MjQzLjE3MDIxNDI5Mjc.*_ga_XJWPQMJYHQ*MTcwNDM4Nzk5NS41LjEuMTcwNDM4ODAwNy40OC4wLjA.)

## Install guide

Below are the instructions to install and run the project in development mode.

```bash
git clone https://github.com/christophermontero/pokeapi.git
cd pokeapi
npm install
npm run dev
```

### Containers

This project also support docker engine, for use the API with containers ensure have docker and docker compose installed and run following commands:

```bash
docker compose -f docker.compose.yml -f docker-compose.dev.yml up -d
```

And for production run the following:

```bash
docker compose -f docker.compose.yml -f docker-compose.prod.yml up -d
```

For stop the containers run the following:

```bash
docker compose -f docker.compose.yml -f docker-compose.dev.yml stop 
```

And for destroy the services use the following command:

```bash
docker compose -f docker.compose.yml -f docker-compose.dev.yml down 
```

## Comments

If you have any feedback, please reach out at cgortizm21@gmail.com

## License

This project is under [Apache License](https://www.apache.org/licenses/LICENSE-2.0).

## Author

[@christophermontero](https://github.com/christophermontero)
