# Trafus

## Summary
Trafus is a team budgeting app. Allows multiple users to maintain team budgets together!

### `Steps:`
<ol>
    <li>Create a User</li>
    <li>Join an existing team or Create your own team</li>
    <li>Create categories for your team's budget</li>
    <li>Add Expenses to each category as you spend.</li>
    <li>Quickly view your team and category summaries. </li>
    <li>Make sure your team stays on budget.</li>
</ol>

## Live application
[Trafus Application : https://rtanubra-trafus-app.now.sh/ ](https://rtanubra-trafus-app.now.sh/)

## Available Scripts
### `npm start`
Runs the app in the development mode.<br>
### `npm test`
Launches the test runner in the interactive watch mode.<br>
### `npm run build`
Builds the app for production to the `build` folder.<br>
### `npm run deploy`
Builds and deploys your application to production<br>

## API Documentation
The application has four main parts:

Development Server located at: [Run API server in localhost 8000](http://localhost:8000/api/)

Production Server located at: [Heroku live application ](https://tranquil-journey-83977.herokuapp.com/api/)

All return objects (if present) will be in JSON format.

<ol>
    <li>Teams</li>
    <li>Users</li>
    <li>Categories</li>
    <li>Expenses</li>
</ol>

### `Teams`

#### `GET: /teams`:
Gets all teams in trafus_teams
####  `POST /teams`:
Posts a team to trafus_teams
body should include:
<ul>
    <li>name (team name) required</li>
    <li>password (team password) optional</li>
</ul>
####   `GET: /teams/:teamId`:
Gets a single team by ID in trafus_teams

### `Users`

#### `GET: /users`:
Gets all users in trafus_users
#### `PATCH: /users`:
Updates a single user in trafus_users
Use this when a user switches teams, to maintain different budgets.
body should include:
<ul>
    <li>id (user id to update) required</li>
    <li>team_id (team id to join) required</li>
    <li>password (team password) required if joining a private team</li>
</ul>

#### `POST: /users`:
Posts a new user into trafus_users

#### `GET: /users/:userId`
Gets a single user in trafus_users

### `Categories`

### `Expenses`

## Screenshots

## Technology Used
### `Client`
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>Javascript</li>
    <li>React</li>
</ul>

### `Server`
<ul>
    <li>NodeJS</li>
</ul>

### `Database`
<ul>
    <li>PostgreSQL</li>
</ul>