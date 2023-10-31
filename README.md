# calculator
This is the final project for the foundations section of TOP. The aim is to create an on screen calculator using HTML/CSS/JS.

The calculator object holds the various operations that can be performed on two numbers. The inputs are gathered from mouse clicks on the calculator UI display and via keyboard presses on the window. The calculator allows for chained inputs to evaluate several operations in sequence, E.g. 12 + 7 - 5 * 3 = 42. The calculator will round decimal numbers longer than the display down to 8 or so places. Various unwanted behaviours have been accounted for albeit at an undesirable cost to code readability and will be worked upon going forward.

Keyboard inputs:
- 0-9 (not numpad numbers)
- Backspace to erase numbers
- Escape to clear/reset 
- Operators "+ - / *" via their respective keys
- "=" to calculate inputs

Improvements to make in future learned from this project:
- Handling types better  E.g. going from string <-> number
- Better planning towards the late stage of the project to allow for cleaner/more readble code
- Better solutions to problems to avoid bugs/unwanted side effects, current solution is hacky and overuses if+return statements
- Remember to use Git branching to work on features of program rather than using codepen to test ideas
- Seperate code into smaller functions to increase readability/re-usability

