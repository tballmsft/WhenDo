// configuration
// change to false if you want letters instead of animations
let animations = true

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
. . # . . . # # # .   
. # . # . # . # . #  
. . # . . . # # # .
. . # . . . . # . .
. . # . . . . # . .
`)

let radioSend = images.createImage(`
. . # . . . # # # .
. # . # . # . # . #
. . # . . . # # # .
. . # . . . . # . .
. . # . . . . # . .
`)

let allOn = images.createImage(`
# # # # # . . . . .   
# # # # # . . . . .  
# # # # # . . . . .
# # # # # . . . . .
# # # # # . . . . .
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
let outputEvents = ["A", "H", "G", "R", "P", "S"];
let outputAnimations = [allOn, happy, grumpy, radioSend, ping, slide]
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
    if (animations) {     
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
    let out = outputEvents[currentOutputEventIndex]
    if (animations) {
        let anim = outputAnimations[currentOutputEventIndex]
        anim.showImage(0, 500)
        anim.showImage(5, 500)
    }
    else
        basic.showString(out)
    if (out == "P")
        soundExpression.hello.play()
    else if (out == "S")
        soundExpression.slide.play()
}

function performOutput() {
    const out = getOutput()
    if (out == "A")
        led.plotAll()
    else if (out == "H") 
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
