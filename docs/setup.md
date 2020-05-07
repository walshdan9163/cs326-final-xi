To compile the project - simply install the packages (`npm install`) and run `npm run start`</br>
Heroku automatically builds/deploys from changes to the project's master branch.

To set up the database locally - create a database inside Postgres, create a file in the main folder called `.env`, and change user, password, port (default is 5432), and database_name as necessary:</br>
DB_URL=postgres://user:password@localhost:port/database_name
