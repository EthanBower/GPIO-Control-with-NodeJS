****************************
* R-Pi GPIO Control Server *
****************************

What it does:
This is a Node.js based server that can host whatever files you give it. However, the main focus of this server is to be used with a Raspberry Pi so that it can host a webpage that displays the status of all GPIO ports. The user can then decide to remotely turn those ports on or off. This is done by having Node.js enter in a console command with specific arguments to the Python environment. These arguments will tell Python what to do, and once done, it will generate a list of each GPIO status (0 or 1) and send it to Node.js for interpretation.  

Prerequisites: 
1) This is a Linux-based project. Use Linux-flavored distros.
2) You need Node.js and Express. Make sure Express is installed in the main working directory of this project.
3) Python 3 also needed.

Getting it to work:
1) Just enter this into the terminal with it on the main working directory.
	-sudo node app.js
2) When done creating the runtime environment, it should work on the localhost with port 500. The server will host the Raspberry Pi GPIO control.

Customizing it:
1) This program was created with customization in mind. If you want to change the port number, root directory, and/or the default file to look for, just open up app.js. 

2) This server doesn't need to be restricted to my Raspberry Pi GPIO control program. You can host any other files/websites with just a little bit of modification of the app.js file. 