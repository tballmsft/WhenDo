# The micro:bit "WhenDo" application

How can you introduce students to the features of the BBC micro:bit
and programming with just the micro:bit itself? The answer is this
simple "WhenDo" application, which is the brainchild of David Whale.   

## How does it work?

You give an input event I and an output action O using just
the A/B buttons of the micro:bit. Together, I and O make up a simple
rule: 
- **When** input event I occurs **Do** ouput action O. 
The micro:bit will execute this rule forever until you reset it. Then you
can create a new rule. Also, some events and actions use the micro:bit
radio, in which case you get to specify the radio group to use. Then
you can have multiple micro:bits (in a large group) work together!

### Input events

First, press the A button to cycle through the following *input events*,
each of which is shown by an animation on the micro:bit screen (or via
a single letter, depending on how you configure the application):

- A: press the A button
- B: ress the B button
- S: shake the micro:bit
- F: hold screen face up
- U: hold screen face down
- D: see dark environment
- L: hear loud sound
- R: radio receive message
- E: press micro:bit emoticon
- P: press pin P0

When you find the input event you want, press the B button to accept it.

### Output events

Now, press the B button to cycle through the following *output actions*:

- H: show appy face
- G: show grumpy face
- R: radio send message
- P: play doorbell sound
- S: play slide sound

When you find the output action you want press the A button to accept it.
