# Rocketmon API

![last commit](https://img.shields.io/github/last-commit/christophermontero/rocketmon-api)
![license](https://img.shields.io/github/license/christophermontero/rocketmon-api)
![build](https://img.shields.io/github/actions/workflow/status/christophermontero/rocketmon-api/pipeline.yml)
![repo size](https://img.shields.io/github/repo-size/christophermontero/rocketmon-api)
![watchers](https://img.shields.io/github/watchers/christophermontero/rocketmon-api?style=social)

## Table of contents

- [Project description](#project-description)
  - [Architecture](#architecture)
  - [Endpoints](#endpoints)
  - [MongoDB documents structure](#mongodb-documents-structure)
- [User guide](#user-guide)
- [Install guide](#install-guide)
  - [Requeriments](#requeriments)
- [Author](#author)
- [License](#license)

## Project description

This is an API for visualize all pokemons with their stats.

### Architecture

#### Use case diagram

![use case diagram](https://github.com/christophermontero/rocketmon-api/blob/master/docs/diagrams/use-case-diagram.jpg?raw=true)

#### Component diagram

![component diagram](https://github.com/christophermontero/rocketmon-api/blob/master/docs/diagrams/component-diagram.jpg?raw=true)

#### Deployment diagram

![deployment diagram](https://github.com/christophermontero/rocketmon-api/blob/master/docs/diagrams/deployment-diagram.jpg?raw=true)

### Endpoints

```
* Auth:
  * POST /api/v1/auth/signup
  * POST /api/v1/auth/signin
* Pokemons:
  * GET /api/v1/pokemon
  * GET /api/v1/pokemon/:name
```

### MongoDB documents structure

- Trainer:
  - name: string,
  - nickname: string,
  - password: string,
  - team: string,

## User guide

Describe the project structure and how to use it.

```bash
.
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
│   ├── services
│   │   ├── pokemon.service.ts
│   │   └── trainer.service.ts
│   ├── utils
│   │   ├── ApiError.ts
│   │   ├── jwt.ts
│   │   ├── logger.ts
│   │   ├── pick.ts
│   │   └── pokemon.ts
│   └── validators
│       ├── auth.validator.ts
│       └── pokemon.validator.ts
├── tests
│   ├── integration
│   │   ├── auth.spec.ts
│   │   └── pokemon.spec.ts
│   └── utils
│       └── setupTestDB.ts
└── tsconfig.json
```

Chekc the API documentation [here](https://rocketmon-api.herokuapp.com/api/v1/docs)

## Install guide

Below are the instructions to install and run the project en development mode.

```bash
git clone https://github.com/christophermontero/rocketmon-api.git
cd rocketmon-api
npm install
npm run dev
```

### Requeriments

- Node.js version 18 or higher [Node.js](https://nodejs.org/en/)
- NPM version 8 or higher [NPM](https://www.npmjs.com/)
- MongoDB version 4 or higher [MongoDB](https://www.mongodb.com/)

## Author

- [Christopher Ortiz Montero](https://github.com/christophermontero)

## License

This project is under [Apache License](https://www.apache.org/licenses/LICENSE-2.0).
