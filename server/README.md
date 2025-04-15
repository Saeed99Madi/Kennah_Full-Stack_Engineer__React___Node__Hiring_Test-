<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# API Documentation

## Overview

This API is built using the [NestJS](https://nestjs.com/) framework, a progressive Node.js framework for building efficient and scalable server-side applications. The API provides endpoints for managing users, tasks, and authentication.

## Features

- **User Management**: Create, update, and manage user data.
- **Task Management**: Create, update, and manage tasks.
- **Authentication**: Secure endpoints using JWT-based authentication.

## Project Setup

To set up the project locally, follow these steps:

```bash
# Install dependencies
$ npm install

# Start the development server
$ npm run start:dev

# Run in production mode
$ npm run start:prod
```

## API Endpoints

### Authentication

- **POST /auth/login**: Authenticate a user and return a JWT token.
- **POST /auth/register**: Register a new user.

### Users

- **GET /users**: Retrieve a list of all users.
- **GET /users/:id**: Retrieve details of a specific user.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update an existing user.
- **DELETE /users/:id**: Delete a user.

### Tasks

- **GET /tasks**: Retrieve a list of all tasks.
- **GET /tasks/:id**: Retrieve details of a specific task.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update an existing task.
- **DELETE /tasks/:id**: Delete a task.

## Running Tests

To ensure the API works as expected, you can run the following tests:

```bash
# Run unit tests
$ npm run test

# Run end-to-end tests
$ npm run test:e2e

# Check test coverage
$ npm run test:cov
```

## Resources

- **Documentation**: [NestJS Documentation](https://docs.nestjs.com)
## License

This project is [MIT licensed](https://opensource.org/licenses/MIT).
