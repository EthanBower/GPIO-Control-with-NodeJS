//This is the logic behind the gpio page. When a request is sent from the client about this page, 'gpiomain.js' will spit out the required data. Then, EJS will markup the given HTML page.

class Gpio {
    static gpiomain(req_fullpath, res, command = 0) {
        const spawn = require("child_process").spawn;//Create a chile process. It will send a comman to the BASH terminal, along with the required arguments.
        
        if (command == 0) {
            command = "state";
            var pythonProcess = spawn('python',["./node_projects/gpio/getGPIOStat.py", command]);
        } else {
            command = command.split(" ");
            
            if (command.length == 1)
                var pythonProcess = spawn('python',["./node_projects/gpio/getGPIOStat.py", command[0]]);
            else
                var pythonProcess = spawn('python',["./node_projects/gpio/getGPIOStat.py", command[0], command[1]]);
        }
        
        pythonProcess.stdout.on('data', (data) => { //Once the data is recived from python, continue.
            var dataIteration = 1,
                gpioblocks = "",
                pythonData = data.toString(); // returns an array of GPIO port statuses from buffer
            const gpioDict = { //this is a dictonary of GPIO pins that cannot be turned on/off
                    "1": "no",
                    "2": "no",
                    "4": "no",
                    "6": "no",
                    "9": "no",
                    "14": "no",
                    "17": "no",
                    "20": "no",
                    "25": "no",
                    "27": "no",
                    "28": "no",
                    "30": "no",
                    "34": "no",
                    "39": "no"
                  };
            
            //console.log(pythonData + " <--Python Data" + pythonData.length);
            if (pythonData[0] != "e") { //python will send 'error' if something happens.
                for (var i = 0; i < 40; i++) {
                    if (i%2 == 0) {
                        gpioblocks = "<div style='display: block'>" + gpioblocks + "</div>";
                    }
                    
                    if (gpioDict[i + 1] == "no") {
                        gpioblocks += "<div class='GPIO_rect_blue'>";
                        gpioblocks += "<p class='GPIO_text_blue'>GPIO Pin: " + (i + 1) + "</p></div>";
                    } else if (pythonData[dataIteration] == '0') {
                        gpioblocks += "<form action='/gpionum" + (i + 1) + "' method='post' class='gpiobuttons'>";
                        gpioblocks += "<div class='GPIO_rect_red'>";
                        gpioblocks += "<p class='GPIO_text'>GPIO Pin: " + (i + 1) + "</p><button type='submit' value='Submit'>Turn Pin On/Off</button></div></form>";
                        dataIteration += 3;
                    } else if (pythonData[dataIteration] == '1') {
                        gpioblocks += "<form action='/gpionum" + (i + 1) + "' method='post' class='gpiobuttons'>";
                        gpioblocks += "<div class='GPIO_rect_green'>";
                        gpioblocks += "<p class='GPIO_text'>GPIO Pin: " + (i + 1) + "</p><button type='submit' value='Submit'>Turn Pin On/Off</button></div></form>";
                        dataIteration += 3;
                    }
                }
            } else {
                gpioblocks = "Cannot get GPIO statuses. Try refreshing.";
            }

            res.render(req_fullpath,{gpioblocks: gpioblocks});
            console.log(`Sent: ${req_fullpath} as .EJS`);
        });
    }
}

module.exports = Gpio;
