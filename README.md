Objectifs: Une appli web qui permet d'afficher les livres présents dans la base de données (et pourquoi pas en ajouter)
1. Mettre en place un serveur NodeJS, avec express, sequelize et EJS
2. Afficher les livres de la BDD
3. Ajouter un livre


- Introduction à Javascript
  - Class, functions, variables
    ```js
    var username = 'toto';
    var username = 'titi'; // OK

    let email = 'toto@gmail.com';
    let email = 'titi@gmail.com'; // ERROR : email est déjà défini

    const password = '1234';
    password = 'azerty'; // ERROR : on ne réassigne pas une constante
    ```

    ```js
    class User {
      id;
      username;

      constructor(id, username) {
        this.id = id;
        this.username = username;
      }

      changeUsername(newUsername) {
        this.username = newUsername;
      }
    }
    ```

  - loops
    ```js
      for(let i=0; i<5; i++) {}

      for(let book of books) {}

      while(isLoading) {}
    ```

  - interpolation
    ```js
      let text = `Welcome ${firstName}, ${lastName}!`;
    ```

  - arrow functions
    ```js
      const add = (a, b) => a + b;

      const add = (a, b) => { return a + b };
    ```

  - arrays
    ```js
      const users = ['Jean'];
      users.push('Michelinne');
      users.forEach((user) => { this.emailToUser(user); });
    ```

  - promises  
    Utilisée pour réaliser des traitements de manière **asynchrone**. Représente une valeur qui peut être disponible maintenant, dans le futur, ou jamais. Par exemple, une requête à une base de données est une opération asynchrone.  
    Cycle de vie d'une promise :
    ![](https://www.freecodecamp.org/news/content/images/2020/06/Ekran-Resmi-2020-06-06-12.21.27.png)

    ```js
      getUsers() {
        const promise = fetchUsers();
        promise.then((users) => {
          // on a accès aux users
          console.log(users);
        }).catch((error) => {
          console.error(error);
        });
      }
    ```
    En dehors du `.then`, on n'a pas accès aux users. On doit attendre que la promise soit **résolue** (**resolved**).  
    Etant donné que ce n'est pas évident de travailler dans le `.then` (imaginez devoir attendre une autre promise à l'intérieur), on peut les attendre autrement, en utilisant les mots clefs `async` et `await`
    ```js
    async getUsers() {
      const loggedUsers = await fetchUsers();
      const guestUsers = await fetchGuests();
      return users.concat(guestUsers);
    }
    ```

<h1>NodeJS</h1>

[nodejs.org](https://nodejs.org/en/download/)  
Première version: 2009
Environnement d'execution permettant d'utiliser Javascript côté serveur.   
Permet de développer des applications web, en javascript.  
Même principe que PHP : le code s'execute côté serveur.  
- vanilla  
  ```js
  const http = require("http");

  const hostname = "127.0.0.1";
  const port = 3000;

  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  ```
  `node app.js`

- npm  
  [npmjs.com](https://www.npmjs.com/)  
  _node package manager_, c'est le manager standard.  
  npm manage les dépendances du projet. En faisant `npm install <package-name>` il ajoute dans le fichier `package.json` le package en tant que **dependency**.  
  Pour initialiser npm et créer un package.json dans un projet, on utilise : `npm init`  
  `npm i` est un raccourci pour `npm install`  
  Lorsqu'on installe un package, il est installé dans le dossier `node_modules`

- nodemon  
  [nodemon github](https://github.com/remy/nodemon)  
  Cet outil permet de relancer le serveur automatiquement lorsqu'un changement est détécté dans les fichiers. On appelle ça du **hot reload** ou **live reload**  
  `npm i nodemon`  
  Au lieu de faire `node app.js` on fera maintenant `nodemon app.js`

- express  
  [expressjs.com](https://expressjs.com/)  
  `npm i express`
  ```js
  const express = require("express");
  const app = express();
  const port = 3001;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/users", async (req, res) => {
    const users = ['user1', 'user2'];
    users.forEach((user) => {
      res.write(`${user.username}\n`);
    });
    res.end();
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  ```


- sequelize  
  [sequelize.org](https://sequelize.org/)  
  `npm i sequelize`  
  `npm i mysql2` ou `npm i pg pg-hstore`

  - connexion
    ```js
    const { Sequelize } = require('sequelize');
    const sequelize = new Sequelize('database', 'username', 'password', {
      host: 'localhost',
      dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });
    ```

    ```js
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    ```
    Pour tester la connexion :
    ```js
    sequelize.authenticate();
    ```
  
  - définition du model
    ```js
    const { Sequelize, DataTypes } = require('sequelize');

    const User = sequelize.define('User', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
      }
    }, {
      tableName: 'Employees'
    });
    ```

  - récupérer des utilisateurs
    ```js
    const users = await User.findAll();
    ```

  - ajouter un utilisateur
    ```js
    const newUser = await User.create({ username: 'toto', email: 'toto@gmail.com' });
    ```


- ejs  
  [ejs.co](https://ejs.co/)  
  `npm i ejs`   
  EJS (Embedded JavaScript templates) est un *template view engine*, il permet de générer du html avec du javascript. Comme Twig (mais Twig fonctionne pour PHP).
  ```js
  const ejs = require('ejs');
  const people = ['geddy', 'neil', 'alex'];
  const html = ejs.render('<%= people.join(", "); %>', {people: people});
  ```
  - On peut aussi créer des fichiers ejs, qui vont contenir notre html :  
    *app.js*
    ```js
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");

    app.get("/", (req, res) => {
      res.render("index", { users });
    });
    ```

    *views/index.ejs*
    ```ejs
    <h1>Users</h1>
    <% users.forEach((user) => { %>
    <%= user.username %></br>
    <% }); %>
    ```
