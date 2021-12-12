# Backend Project

This project consists in making the backend for a ecommerce.

## Tools Used

These are some of the tools, frameworks, packages,
languages I used for developing and testing the app.

### Development

- NodeJs
- Typescript
- Express

### Testing

- Mocha
- Supertest
- Chai

## Installation

Download the files from this repository or clone the repository:

```shell
git clone https://github.com/ErneDainesi/proyecto-backend.git
```

Once the files are downloaded, you should install the projects dependencies
with [npm](https://docs.npmjs.com/):

```shell
npm install
```

## Building & Running

After downloading the project files and installing
its dependencies, these are some commands you can
use to build and run the app:

> This will transpile the typscript files into javascript in the dist folder

```shell
npm run build 
```

> This will build and start the project

```shell
npm run start
```

> This will run the project using the TS files. This is useful for development

```shell
npm run start-dev
```

## Running tests

To run tests you first have to build the project. After
that, you must start the app. Once this is done, you can run
the test script. These tests can be found inside the `test` folder.  
These steps should be run in different terminals as follows:

> In one terminar run the build and start script

```shell
npm run start
```

> And in another terminal, run this command

```shell
npm run test
```

