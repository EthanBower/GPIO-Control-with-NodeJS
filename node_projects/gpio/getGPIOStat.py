#!/usr/bin/python3

#This script can obtain the status of every GPIO, set each a specific port on or off, or turn all ports on/off. Some ports cannot be set/unset due to its nature.
#The script supports terminal command arguments. Here are the arguments:

#This will output the state of every applicable pin: ./getGPIOStat.py state 
#This will set all applicable pins off: ./getGPIOStat.py clean
#This will set all applicable pins on: ./getGPIOStat.py activateAll
#This will toggle an applicable pin on/off: ./getGPIOStat.py changeState [ENTER PIN NUMBER]

import sys
import RPi.GPIO as GPIO

gpioState = []
GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
gpioDict = { #this is a dictonary of GPIO pins that cannot be turned on/off
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
}

def getGPIOState():
    for pin_num in range(1,41):
        if str(pin_num) not in gpioDict:
            GPIO.setup(pin_num, GPIO.OUT)
            state = GPIO.input(pin_num)

            gpioState.append(state)

    return gpioState

def changeGPIOState(argv):
    argv = int(argv, 10)
    GPIO.setup(argv, GPIO.OUT)
    state = GPIO.input(argv)
    if state == 1:
        GPIO.output(argv, GPIO.LOW)
    else:
        GPIO.output(argv, GPIO.HIGH)
    
    return getGPIOState()

def cleanGPIOState():
    for pin_num in range(1,41):
        if str(pin_num) not in gpioDict:
            GPIO.setup(pin_num, GPIO.OUT)
            GPIO.output(pin_num, GPIO.LOW)
            state = GPIO.input(pin_num)

            gpioState.append(state)

    return gpioState

def activateAllGPIO():
    for pin_num in range(1,41):
        if str(pin_num) not in gpioDict:
            GPIO.setup(pin_num, GPIO.OUT)
            GPIO.output(pin_num, GPIO.HIGH)
            state = GPIO.input(pin_num)

            gpioState.append(state)

    return gpioState
    

if sys.argv[1] == "state":
    output = getGPIOState()
elif sys.argv[1] == "clean":
    output = cleanGPIOState()
elif sys.argv[1] == "activateAll":
    output = activateAllGPIO()
elif sys.argv[1] == "changeState" and len(sys.argv) == 3:
    output = changeGPIOState(sys.argv[2])
else:
    output = "error"

print(output)
sys.stdout.flush()

