# Cozmo-Challenge v0.3
Playfully learning how to program

---
Cozmo is a robot from Anki with an interesting SDK. Inspired by Cubetto (https://www.primotoys.com/) the idea grew to create a learning environment for kids. Cozmo is fun to be around, and what if this cute little guy helps you learn how to program? 

V0.3 is the first public release. There are many ideas on how to proceed from here that may or may not be built, but this prototype needs some testing before adding more bells and whistles.
 
What does the game do exactly?
-
A player can insert move commands into blank 'slots' on a browser screen. I.e.: A set of move commands can consist of a 'forward', 'forward', 'right'. When clicking on the 'Play' button these commands will be executed in the order they were placed: 2x forward followed by a turn to the right. An sample printable map is also provided, it should encourage having a goal for Cozmo to travel to.

What do you need to play?
-
1. Cozmo himself (http://anki.com/cozmo)
2. A PC and a mobile device
3. A little knowledge about Python and Javascript
4. Knowledge of the Cozmo SDK (http://cozmosdk.anki.com/docs)
5. The files in this repository

If you know how to run an example file from the Cozmo SDK, you should be able to run this game. 

System requirements
-
- PC with Windows OS, mac OSX or Linux
- Python 3.5.1 or later
- WiFi connection
- An iOS or Android mobile device with the Cozmo app installed, connected to the PC via USB cable
- Modern browser with ES6 support (http://kangax.github.io/compat-table/es6/)
- Optional: Separate mobile device able to connect to the PC via the regular WiFi network. As the game supports touch, this provides a more natural user experience.  