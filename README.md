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
  * GET /api/v1/pokemons
  * GET /api/v1/pokemons/:id
  * GET /api/v1/pokemons/:id/evolution
  * GET /api/v1/pokemons/:id/evolution/chain
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

Chekc the API documentation [here]()

## Install guide

Below are the instructions to install and run the project en development mode.

```bash
git clone https://github.com/christophermontero/rocketmon-api.git
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

This project is under [Apache License](https://www.apache.org/licenses/LICENSE-2.0).
