# movie-list-CRUD step-by-step instructions to develop CRUD app

# Backend Set-up

- At this point, there should be README.md file
- Run follwoing commands
  -- `npm init -y`
  -- `npm install` for package-lock.json
  -- `npm i express knex pg cors nodemon`
  -- `touch .gitignore`

cors: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS

# Backend Api

- create api folder for backend
- navigate to api folder
- Run following commands
  -- `npm init -y`
  -- `npm install` for package-lock.json
  -- `npm i express knex pg cors nodemon`
  -- `touch .gitignore`
  -- `npx knex init`
  -- this cmd will create a template file called knexfile.js

- navigate to knexfile.js and update following
  development: {
  client: 'postgresql',
  connection: {
  host: '127.0.0.1',
  password: 'docker',
  user: 'postgres',
  port: 5432,
  database: 'harmandb'
  }
  },

## docker container to store data

-- check the latest version of docker
-- `docker -a`
-- if docker is not install, please make sure to install a docker app

### Follow steps below to create postgres container for the CRUD app

1. Pull down a Dockerized Postgres image from the cloud
   -- `docker pull postgres`
2. Create the directories that will house your database data:
   -- `mkdir -p $HOME/docker/volumes/postgres`
   -p mean create parent folders
3. Start up a Docker Postgres container instance of the image that you pulled.
   -- `docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres`
   --rm: remove the contaoner when stopped
   --name: gives explicit name
   -e: this is enviornmental variable
   -PASSWORD: use this to connect to the database
   -d: run detached state
   -p: port mapping. exposing a port and mapping to container default port of 5432
   -v: map the volume that created in previous cmd to /var... which is the default storage in the docker
   -postgres: is the image to use

- at this point, container id would be displayed and created

4. List all Docker images that are currently running:
   -- `docker ps -a`
5. Switch to the Docker image's shell with the container id you see from running the above in your terminal. Then, verify your version of Postgres. Make sure to replace <PSQL-Container-ID> with the id from the previous command output:
   -- `docker exec -it <PSQL-Container-ID> bash`
   -- `postgres --version`
6. Verify the latest version of PostgreSQL was installed correctly by running the following commands:
   -- `psql --version`
7. Log in to the psql (Postgres) shell with the default postgres user:
   -- `psql -U postgres`
   -- -U: is the user and postgress is the default user
8. Now you can write SQL queries in the command line. Invoke this function to show your Postgres version:
   -- `SELECT version();`

9. Create database
   -- `CREATE DATABASE <database_name>;`
   This should be same name as the database in the knexfile.js
10. Connect to newly create database
    -- `/c <database_name>`

Once tables are migrated and seeded, table will show up in the database

\*\*Exiting Shells
Use <CTRL>-D to exit the psql or Docker shell.
For Mac user, press `q`

## create file named app.js for api

- basic code to setup a server is as follows
  const express = require('express');
  const app = express();
  const port = 8081;

  const knex = require('knex')(require('./knexfile.js')["development"]);

  // require knex pull the library, and the excuses the function that require specific knexfile.js
  // development indicates which specific client to use within knexfile.js

  const cors = require('cors');
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
  res.send("application is up and running")
  })

  app.listen(port, () =>{
  console.log(`Your Knex and Express applications are running succesfully at port: ${port}`)
  })

- navigate to package.json and update the scripts
  -- `"start": "nodemon app.js",`
- in the terminal, run following
  -- `npm start`
- You should see console.log in the terminal and info displayed on the localhost:{port}

- once the server is running, next step is to migrate and seed the data
- Start with migrate based on ERD structure
  -- `npx knex migrate:make <table-name>`
- navigate to migrations folder and the file that was just creates
  -- review the knex documentations and complete the knex.schema for the table
- Once table is established, run
  -- `npx knex migrate:latest`

  > table should be populated in the database. run following to check
  > -- `SELECT * FROM knex_migrations;`

- Create a seed file
  -- `npx knex seed:make <table-name>`
- navigate to the seed folder and complete the table based on the ERD
- thereafter run following command to seed the data into the table
  -- `npx knex seed:run`
- To rollback database
  -- `npx knex migrate:rollback`

---

# Front End Set-up
