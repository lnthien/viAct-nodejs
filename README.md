# Installation

- Clone the repository

```
git clone --depth=1 <link-repo> <project_name>
```

- Install dependencies

```
$ cd <project_name>
$ yarn
```

- Create file `.env` in your project's directory root. Your Nodejs Application will get ENV from this file.
  After that. change content in this file with value corresponding above step.

```bash
$ cp .env.example .env
```

## Running in mode development

```bash
$ yarn run start:dev
```

## Structure

1. Project configuration

```
.dockerignore             - docker ignore files
.lintstagerc              - tslint check config
.prettierignore           - prettier ignore files
.prettierrc               - prettier config
DockerFile                - Dockerfile
tsconfig.json             - typescript transpilation rule
tslint.json               - typescript lint rule
```

### Structure of a module GraphQL:

- `app/graphql/modules/*.module.ts` Define name module.
- `app/graphql/modules/*.resolver.ts` Handle process of API.
- `app/graphql/modules/*.graphql` Define schema Graphql.
- `app/graphql/dto/*.ts` Define validation of input.
- `app/graphql/general.graphql` General type of Graphql. For example `type DateTime`, ...
- `app/graphql/graphql.schema.ts` (DO NOT EDIT THIS FILE) This is file will be generated auto when you run command `yarn run generate-typings`. This file will help you more easy when working with typescript.