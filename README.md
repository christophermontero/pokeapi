# Rocketmon API

![last commit](https://img.shields.io/github/last-commit/christophermontero/rocketmon-api)
![license](https://img.shields.io/github/license/christophermontero/rocketmon-api)
![build](https://img.shields.io/github/actions/workflow/status/christophermontero/rocketmon-api/pipeline.yml)
![repo size](https://img.shields.io/github/repo-size/christophermontero/rocketmon-api)
![watchers](https://img.shields.io/github/watchers/christophermontero/rocketmon-api?style=social)

- [Content:](#content)
- [Project description](#project-description)
  - [Endpoints](#endpoints)
  - [MongoDB documents structure](#mongodb-documents-structure)
- [User guide](#user-guide)
- [Install guide](#install-guide)
  - [Requeriments](#requeriments)
- [Author](#autores)
- [License](#License)

## Project description

This is an API for visualize all pokemons with their stats.

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
├── config
│   ├── custom-environment-variables.json
│   ├── default.json
│   ├── production.json
│   └── test.json
├── docs
│   └── rocketmon-api-doc-v1.json
├── jest.config.ts
├── LICENSE
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── constants
│   │   └── responses.ts
│   ├── controllers
│   │   ├── auth.ts
│   │   └── pokemonBridge.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── Trainer.ts
│   │   ├── models
│   │   │   ├── getPokemons.ts
│   │   │   ├── login.ts
│   │   │   └── trainer.ts
│   │   ├── orm
│   │   │   ├── pokemon.ts
│   │   │   └── trainer.ts
│   │   ├── repositories
│   │   │   └── mongoDb.ts
│   │   └── services
│   │       ├── auth.ts
│   │       └── pokemon.ts
│   ├── middlewares
│   │   └── index.ts
│   ├── routes
│   │   └── v1
│   │       └── index.ts
│   ├── server
│   │   └── index.ts
│   ├── utils
│   │   ├── jwt.ts
│   │   ├── logger.ts
│   │   └── pokemon.ts
│   └── validators
│       ├── login.ts
│       ├── pokemon.ts
│       └── trainer.ts
├── tests
│   └── integration
│       └── routes
│           ├── auth.spec.ts
│           └── pokemon.spec.ts
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
