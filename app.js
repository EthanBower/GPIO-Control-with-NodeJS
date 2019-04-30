//This file is simply the main page that calls the 'server.js' file through the use of a class object.
//To start the server, just declare a new instance and set the constructor values to: ([port],[Folder to Look At], [File to Find]).
//Once object is declared, run the startServer() method.

const Server = require('./server');
const server = new Server(500, "/Websites/gpio_pages", "index.ejs");

server.startServer();
