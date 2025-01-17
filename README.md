# Secret Santa

Secret Santa App that draws the complete list of relationships ensuring that each participant receives a gift and has to offer one while taking into account their potential blacklist

## Description

This app is a monorepo using npm workspaces.
The backend is in the directory `/server` and is written in TypeScript Node.js with Express.
The frontend is in the directory `/client` and is written in TypeScript React.js using a Vite build.

## Installation

Install dependencies at root level `package.json`

```bash
 npm install
```

## Usage

To execute the commands for the whole project execute at root level `package.json`, else you can execute at desired workspace.

1. To run the project, use the following command:

```bash
npm run dev
```

2. To lint the project with eslint, use the following command:

```bash
npm run lint
```

3. To format the project with prettier, use the following command:

```bash
npm run format
```

4. To build the project, use the following command:

```bash
npm run build
```

5. To test the project with vitest, use the following command:

```bash
npm run test
```

## Technology Decisions

- **React.js** for reactive interactions and renders on the frontend. This is also my most recent knowledgeable library compared to Angular and Vue. In addition, React has a much higher usage compared to the other 2 JavaScript libraries/framework making it easier to onboard other Engineers.
- **Tailwind** since there were no need for complicated component libraries I decided to use Tailwind for ease of styling. Tailwind is also my recent go-to CSS framework as it provides full control of CSS to Engineers without the heavy burden of syntax memorisation.
- **Vite** I chose to use Vite as the build tool as it provides a fast start and perfect for small projects. The generation tool cater to specific project needs so it does not by default pull down many dependencies.
- **Node.js** was chosen as it's a perfect candidate for simple REST services. Since it was written in TypeScript there are no complicated context switching between backend and frontend.
- **Express JS** is a Node.js web application framework that provide broad features for servers and routes. Express is an un-opinionated framework which allows us as developers to structure our code in the way we see best fit. Express was a perfect candidate in this instance as it was quick and easy to define API endpoints.
- **Sequelize** is a popular Node.js ORM (Object-Relational Mapping) library for interacting with SQL-Based databases. I opted to use `sqlite::memory` which means SQLite runs entirely in memory instead of writing data to a physical database file. In this instance, the usage makes sense as Secret Santa is used for one time and does not require future persistence. If this App was productionalised then we would need to move to an actual SQL database.

## To do if more time

- I would deploy this App on AWS Lambda due to cost efficiency of pay-per-use, automatic scaling if required.
- To implement an user authentication I would use Amazon Cognito as if the app is deployed on AWS then it will be the exact same eco-system. Amazon Cognito is widely used with built-in user management and authentication workflows and customisable login pages with common services like Google and Meta.
- If this App was to be on Production, I would write more time to ensure at least 80% test coverage for the codebase. I would also write E2E test as this helps with regression and a shift-left approach.
