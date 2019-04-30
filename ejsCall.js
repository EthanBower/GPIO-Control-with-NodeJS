//This file is called whenever server.js detects an 'ejs' file. Here, you can add the specfic JS file that is needed to run the '.ejs' file for HTML markup.
//The idea of this file is so that future projects can simply be added onto here and be more modular. Use the 'if' statement as a template.

class EjsFileCall {
    static ejsFilePath(req_fullpath, res, baseDir, optional = 0) { //optional is here for command arguments if need be.
        //Below is for GPIO Project
        if (req_fullpath == baseDir + "/index.ejs") { //If the requested path is equal to the set base directory(set by declaring the server class, plus any re-direct), then continue and start project
            const Gpio = require('./node_projects/gpio/gpiomain.js'); //get function for specific file requested
            if (optional != 0)
                Gpio.gpiomain(req_fullpath, res, optional);
            else
                Gpio.gpiomain(req_fullpath, res);
        }
        //GPIO project end
    }
}

module.exports = EjsFileCall;
