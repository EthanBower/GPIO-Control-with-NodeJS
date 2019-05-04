//This is the server file. Its job is to constantly listen on the selected port and *dynamically* host files to the client.
//To be dynamic, the server has to listen for any GET request and know how to handle each partial URL it gets.
//The server supports any file that is shown in the 'mimeDictionary' constant, plus the .ejs extension. It is not listed in the dictionary because a more specific action needs to be taken for it.

const express = require('express'),
    app = express(),
    fs = require('fs'),
    ejs = require('ejs'),
    path = require('path'),
    ejsCall = require('./ejsCall.js'),
    mimeDictonary = { //Before stream is sent, the clients browser needs to know the type of data it recieves on the header
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'text/javascript',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.json': 'application/json',
          '.svg': 'image/svg+xml',
          '.pdf': 'application/pdf',
          '.doc': 'application/msword',
          '.eot': 'appliaction/vnd.ms-fontobject',
          '.ico': 'image/x-icon',
          '.wav': 'audio/wav',
          '.mp3': 'audio/mpeg',
          '.ttf': 'aplication/font-sfnt'
      };

class Server {
    
    constructor(serverPort, baseDir, filetofind) {
        this.port = serverPort;
        this.baseDir = baseDir;
        this.filetofind = filetofind;
    }
    
    cleanup(servr) { // When cntrl + c is pressed, it will safly close the port(s)
        process.on('SIGINT', function () {
            servr.close(function () {
                    console.log(`\nServer on port ${this.port} closed!`);
            }.bind({port: this.port}));
        }.bind({servr: servr, port: this.port}));
    }
    
    listeners() { //These are custom listeners for POST requests. Add/take as needed.
        app.post('/allGPIOon', function(req, res) {
            var fullpath = path.join(__dirname, this.baseDir + "/index.ejs");
            const parsed_path = path.parse(fullpath);
            const command = "activateAll";
            
            ejsCall.ejsFilePath(fullpath, res, parsed_path.dir, command);
        }.bind({baseDir: this.baseDir}));
        
        app.post('/allGPIOoff', function(req, res) {
            var fullpath = path.join(__dirname, this.baseDir + "/index.ejs");
            const parsed_path = path.parse(fullpath);
            const command = "clean";
            
            ejsCall.ejsFilePath(fullpath, res, parsed_path.dir, command);
        }.bind({baseDir: this.baseDir}));
        
        app.post('/gpionum:id', function(req, res) {
            var fullpath = path.join(__dirname, this.baseDir + "/index.ejs");
            const parsed_path = path.parse(fullpath);
            const command = "changeState " + req.params.id;
            
            ejsCall.ejsFilePath(fullpath, res, parsed_path.dir, command);
        }.bind({baseDir: this.baseDir}));
    }
    
    startServer() {
        app.set("view engine", "ejs"); //Use ejs as markup
        app.set("views", __dirname + this.baseDir); //Don't use defualt views folder

        var servr = app.listen(this.port, () => console.log(`Server is now listening on port ${this.port}!`));
        
        app.get('/*', (req, res) => { //Listen for any GET request.
            var fullpath = path.join(__dirname, this.baseDir + req.originalUrl); //Generate a full path to the requested file
            
            fs.exists(fullpath, (exist) => { //Check if the requested path exists
                if (!exist) { // if the file does not exist, return 404
                    res.statusCode = 404;
                    res.end(`File ${req.originalUrl} not found.`);
                    return;
                }

                if (fs.statSync(fullpath).isDirectory()) { // If requested path is a directory, then look for the file to find, given by the Server() constructor. For example: req='/' is a directory, but req='/home.html' is not. This is sync because we NEED to know this before anything else continues.
                    if (fs.existsSync(fullpath + this.filetofind)) { // If the file name set by user exists, add it to the fullpath var
                        fullpath += this.filetofind;
                    } else { //Else send error
                        res.statusCode = 404;
                        res.end(`Could not find file: ${this.filetofind}. Be sure to check the last constructor argument in the Server object to JUST the name of the file.`);
                        return;
                    }    
                }

                const parsed_path = path.parse(fullpath); //Parse the fullpath
                const ext = parsed_path.ext; // get extension

                if (ext != '.ejs') { //If the extension isnt a .ejs file
                    if (mimeDictonary[ext] == null) { //If extension file is not in the mimeDictionary list, then set header to 'text/plain' as last resourt
                        console.log(`text/plain`);
                        res.set('Content-type', 'text/plain');
                    } else { //Send proper mime type based on extension
                        res.set('Content-type', mimeDictonary[ext]);
                    }
                    res.status(200);
                    res.sendFile(fullpath);
                    console.log(`Sent: ${fullpath} as ${mimeDictonary[ext]}`);
                } else { //If file is type .ejs, then call function from 'ejsCall.js'
                    ejsCall.ejsFilePath(fullpath, res, parsed_path.dir);
                }
            });
        });

        this.listeners(); //Set up special listeners
        this.cleanup(servr); //Set up listener for ctrl+c action
    }
}

module.exports = Server;
