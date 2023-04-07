# Rocketmon API

[![Build Status](https://travis-ci.com/christophermontero/rocketmon-api.svg?branch=master)](https://travis-ci.com/christophermontero/rocketmon-api)
[![Coverage Status](https://coveralls.io/repos/github/christophermontero/rocketmon-api/badge.svg?branch=master)](https://coveralls.io/github/christophermontero/rocketmon-api?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/7b5f9b0b7b5f9b0b7b5f/maintainability)](https://codeclimate.com/github/christophermontero/rocketmon-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7b5f9b0b7b5f9b0b7b5f/test_coverage)](https://codeclimate.com/github/christophermontero/rocketmon-api/test_coverage)

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
* Proyecto: http://localhost:8080/proyectos
* Módulos: http://localhost:8080/modulos
* Funciones: http://localhost:8080/funciones
```

### MongoDB documents structure

- Trainer:
  - name: string,
  - nickname: string,
  - password: string,
  - team: string,

## User guide

Describe the structure of the project and its architecture.

```bash
.
├── config
│   ├── custom-environment-variables.json
│   ├── default.json
│   └── test.json
├── coverage
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov.info
│   └── lcov-report
│       ├── base.css
│       ├── block-navigation.js
│       ├── constants
│       │   ├── index.html
│       │   └── responses.ts.html
│       ├── controllers
│       │   ├── auth.ts.html
│       │   └── index.html
│       ├── domain
│       │   ├── entities
│       │   │   ├── index.html
│       │   │   └── Trainer.ts.html
│       │   ├── orm
│       │   │   ├── index.html
│       │   │   └── trainer.ts.html
│       │   ├── repositories
│       │   │   ├── index.html
│       │   │   └── mongoDb.ts.html
│       │   └── services
│       │       ├── auth.ts.html
│       │       ├── index.html
│       │       ├── security.ts.html
│       │       └── trainer.ts.html
│       ├── favicon.png
│       ├── index.html
│       ├── middlewares
│       │   ├── index.html
│       │   └── index.ts.html
│       ├── prettify.css
│       ├── prettify.js
│       ├── routes
│       │   └── v1
│       │       ├── index.html
│       │       └── index.ts.html
│       ├── server
│       │   ├── index.html
│       │   └── index.ts.html
│       ├── sort-arrow-sprite.png
│       ├── sorter.js
│       ├── utils
│       │   ├── index.html
│       │   ├── jwt.ts.html
│       │   └── logger.ts.html
│       └── validators
│           ├── index.html
│           ├── login.ts.html
│           └── trainer.ts.html
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
│   │   └── auth.ts
│   ├── domain
│   │   ├── entities
│   │   │   └── Trainer.ts
│   │   ├── models
│   │   │   ├── login.ts
│   │   │   └── trainer.ts
│   │   ├── orm
│   │   │   └── trainer.ts
│   │   ├── repositories
│   │   │   └── mongoDb.ts
│   │   └── services
│   │       └── auth.ts
│   ├── middlewares
│   │   └── index.ts
│   ├── routes
│   │   └── v1
│   │       └── index.ts
│   ├── server
│   │   └── index.ts
│   ├── utils
│   │   ├── jwt.ts
│   │   └── logger.ts
│   └── validators
│       ├── login.ts
│       └── trainer.ts
├── tests
│   └── integration
│       └── routes
│           └── auth.spec.ts
└── tsconfig.json
```

Puede consultar la documentación del API [aquí](https://documenter.getpostman.com/view/7032390/TzY4gb3F)

## Install guide

Below are the instructions to install and run the project en development mode.

```bash
git clone https://github.com/christophermontero/estima-tu-proyecto.git
cd rocketmon-api
npm install
npm run dev
```

### Requeriments

- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Author

- [Christopher Ortiz Montero](https://github.com/christophermontero)

## License

This project is under [Apache Licence](http://opensource.org/licenses/mit-license.php).
