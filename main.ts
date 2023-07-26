// configuration
// change to true if you want animations instead of letters
let letters = false

// the inspiration for this program is from David Whale and
// addresses the question: "what if you have 30 students and
// 30 micro:bits and no computers". 

// the solution here is to create a simple "programming"
// experience using just the micro:bit, where the user
// gets to create one When <input-event> Do <action> rule.

// the behavior
// - press the A button to rotate through micro:bit "input events"
// - press the B button to accept the current input event I
//   and start rotating through micro:bit "output events"
// - press the A button to accept the current output event O
//   and begin program execution

// During programing execution, do the following forever:

// - wait for input event I 
// - produce output event O
// - wait a second
// - clear the screen

// the input events are

// - A: press of the A button
// - B: press of the B button
// - S: shake
// - F: screen up
// - U: screen down
// - D: dark
// - L: loud
// - R: radio message (receive)
// - E: touch emoticon
// - P: touch P0

// the output events are

// - H: happy face
// - G: grumpy face
// - R: radio message (send)
// - P: ping (sound)
// - S: slide (sound)

let pressA = images.createImage(`
. . # . . . . # . .
. . # . . . # . # .
# . # . # . # # # .
. # # # . . # . # . 
. . # . . . # . # .
`)

let pressB = images.createImage(`
. . # . . . # # . .
. . # . . . # . # .
# . # . # . # # # .
. # # # . . # . # . 
. . # . . . # # . .
`)

let pressEmo = images.createImage(`
. . # . . . . . . .
. . # . . . # # # .
# . # . # # . . . #
. # # # . . # # # . 
. . # . . . . . . .
`)

let pressP0 = images.createImage(`
. . # . . . . # . .
. . # . . . # . # .
# . # . # . # . # .
. # # # . . # . # . 
. . # . . . . # . .
`)

let shake = images.createImage(`
. . # # . . # # . .   
. . . . # # . . . . 
# . # . # # . # . #
# . . . . . . . . #
. # # . . . . # # .
`)

let faceUp = images.createImage(`
. . . . . . . # . .   
. . . . . . . # . . 
. . . . . . . # . .
. # . # . . # . # .  
# # # # # # # # # #
`)

let faceDown = images.createImage(`
# # # # # # # # # #   
. # . # . . # . # . 
. . . . . . . # . .
. . . . . . . # . .
. . . . . . . # . .
`)

let goDark = images.createImage(`
. . . . . . . . . .   
. . . . . . . . . .  
. . # . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
`)

let goLoud = images.createImage(`
. . . . . . . # . .   
. # . . . . # # . #  
# # . . . # # # # .
. # . . . . # # . #
. . . . . . . # . .
`)

let radioReceive = images.createImage(`
. . . . # . . # . #   
. . . . # # # # # #  
. . . . # . . # . #
. . . . # . . . . #
. . . . # . . . . #
`)

let radioSend = images.createImage(`
. . . . # . # . . #   
. . . . # # # # # #  
. . . . # . # . . #
. . . . # . . . . #
. . . . # . . . . #
`)

let happy = images.createImage(`
. . . . . . . . . .   
. # . # . . . . . .  
. . . . . . . . . .
# . . . # . . . . .
. # # # . . . . . .
`)

let grumpy = images.createImage(`
. . . . . . . . . .   
. # . # . . . . . .  
. . . . . . . . . .
. # # # . . . . . .
# . . . # . . . . .
`)

let ping = images.createImage(`
. . . . . . . . . .   
. . . . . . . # . .  
. . # . . . # . # .
. . . . . . . # . .
. . . . . . . . . .
`)

let slide = images.createImage(`
# . # # . # . . . .   
. # # # . . # . # #  
. . # . . . . # # #
. . . # . . . . # .
. . . . # . . . . #
`)

let inputEvents = ["A", "B", "S", "F", "U", "D", "L", "R", "E", "P"];
let inputAnimations = [pressA, pressB, shake, faceUp, faceDown, goDark, goLoud, radioReceive, pressEmo, pressP0 ]
let outputEvents = ["H", "G", "R", "P", "S"];
let outputAnimations = [happy, grumpy, radioSend, ping, slide]
let currentInputEventIndex = 0;
let currentOutputEventIndex = 0;
let mode = 0; 
music.setBuiltInSpeakerEnabled(true)
music.setVolume(127)
let group = 1

function getInput() {
    return inputEvents[currentInputEventIndex]
}

function showInput() {
    if (!letters) {     
        let anim = inputAnimations[currentInputEventIndex]
        anim.showImage(0, 500)
        anim.showImage(5, 500)
    }
    else
        basic.showString(inputEvents[currentInputEventIndex])
}

function getOutput() {
    return outputEvents[currentOutputEventIndex]
}

function showOutput() {
    if (!letters) {
        let anim = outputAnimations[currentOutputEventIndex]
        anim.showImage(0, 500)
        anim.showImage(5, 500)
    }
    else
        basic.showString(outputEvents[currentOutputEventIndex])
}

function performOutput() {
    const out = getOutput()
    if (out == "H") 
        basic.showIcon(IconNames.Happy)
    else if (out == "G")
        basic.showIcon(IconNames.Sad)
    else if (out == "R")
        radio.sendNumber(42)
    else if (out == "P")
        soundExpression.hello.playUntilDone()
    else if (out == "S")
        soundExpression.slide.playUntilDone()
    pause(1000)
    basic.clearScreen()
}


input.onButtonPressed(Button.A, () => {
  if (mode == 0) {
      currentInputEventIndex = (currentInputEventIndex + 1) % inputEvents.length;
  } else if (mode == 1) {
      if (getOutput() == "R" || getInput() == "R")
        mode = 3 // radio group mode
      else {
        mode = 2
        basic.clearScreen()
      }
  } else if (mode == 2) {
      if (getInput() == "A")
        performOutput()
  } else if (mode == 3) {
      group = (group + 1) % 17
      if (group == 0) group = 1
  }
})

input.onButtonPressed(Button.B, () => {
    if (mode == 0) {
        mode = 1
    } else if (mode == 1) {
        currentOutputEventIndex = (currentOutputEventIndex + 1) % outputEvents.length;
    } else if (mode == 2) {
        if (getInput() == "B")
            performOutput()
    } else if (mode == 3) {
        mode = 2
        radio.setGroup(group)
        basic.clearScreen()
    }
})

input.onGesture(Gesture.Shake, function () {
    if (mode == 2 && getInput() == "S")
        performOutput()
})

input.onGesture(Gesture.ScreenUp, function () {
    if (mode == 2 && getInput() == "F")
        performOutput()
})

input.onGesture(Gesture.ScreenDown, function () {
    if (mode == 2 && getInput() == "U")
        performOutput()
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (mode == 2 && getInput() == "E")
        performOutput()
})

input.onPinPressed(TouchPin.P0, function () {
    if (mode == 2 && getInput() == "P")
        performOutput()
})

radio.onReceivedNumber(function (receivedNumber: number) {
    if (mode == 2 && getInput() == "R" && receivedNumber == 42)
        performOutput()
})

forever(() => {
    if (mode == 0)
        showInput()
    else if (mode == 1)
        showOutput()
    else if (mode == 3)
        basic.showNumber(group)
    else if (mode == 2 && getInput() == "D" && input.lightLevel() < 2) {
        performOutput()
    }
})
