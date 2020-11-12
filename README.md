# HiringTest
IBM Hiring Test

## Where to Find It
Follow this mega-fun link.
https://megafunadventuremania.eu-gb.cf.appdomain.cloud/

## Applying for Position
Full-stack / Automation

## Justification of Technologies
### Node.js
    Solid server, and keeping it JS to JS makes the process simpler.
### Express
    Chosen for ease of use.
### MongoDB
    Database modelling through Mongoose speeds up development. 
### JQuery/HTML
    I'm familiar with JQuery and Bootstrap in conjunction, and went for a safer, known choice, as I'm not particularly familiar with React, Angular og Vue ...yet!



## Process
First a quick mock-up UI helps me settle on the overall architecture. From there, it's code snippets as inspiration to familiarize myself with the syntax of Mongo, Express, etc. Lastly, uploaded the whole kit and caboodle to cloud foundry to get hosted.


## Known Issues
Secrets used to sign JSON webtokens should be kept securely (either as configuration or database, etc.), and not in-line as code. 
Passwords should be kept hashed in database, and definitely not included in the JWT token.
Missing Error handling, so services stall at times. Please contact me, to restart it, if it does.
Server database is in-memory at cloud-foundry, and so is easily lost on restarts, code pushes.
To link a Youtube video, it needs to be an embedded link - which isn't stated in the UI.
There is no validation of links for pictures or videos - so prone to user errors.
Node modules should have been .gitignore'd.
Because cookies aren't always cleaned, the dirty cookie check to see if you're logged in leaves some new users having to "log out" before registering and logging in.


## How To Run
npm i 
npm start

