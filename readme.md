# SKYHUB in React Js

## 1 Installation

1. Install Node.js : https://nodejs.org/en/download/
2. gitclone repository https://github.com/ibudisteanu/SkyHub-Frontend-React.js.git . You can also install and clone using **Git Desktop**
3. Install the missing modules with `npm install missing-node-module-name --save`

4. Open Command Prompt/Terminal and    
    1.    **cd** location\clone_repository\
5. npm install

## 2 Installing the react-country-select module to be compatible 

1. Open react-country-select\index.js and remove or comment the import of **require('react-select/dist/react-select.css');**
2. Open react-country-select\Package.json and add  "style": "dist/react-select.min.css",

## 3 Upgrading node.js from 6.x to 8.x 

1. install missing modules with `npm install missing-node-module-name --save`
    1. In case it is required to install react-country-select module, follow step No 2.
2. Run `npm rebuild node-sass`

## Running SkyHub Frontend

1. npm run dev -s

It will start on port 8080, and you can access the frontend server by http://127.0.0.1:8080/ 

#### Online Versions:

1. myskyhub.ddns.net:8080 for React Frontend
2. myskyhub.ddns.net:3000 for Express Backend with Redis Database


##### intellij WebStorm

The "src" folder must be set as Resource Root. To do this Settings->Directories where you Set Directories "src" folder as "Resource Root"


# TO DOs

##### Working components

1. Login
2. Register
    2.1. Facebook & Google integration, but I need to write the server processing code
3. REST
    3.1 Socket.io
        3.2 Cookie Authentication JWT (using tokens)
    3.2 HTTP requests   
5. Header Navigation Menu
6. Server Status Head Bar
7. Forums
    7.1 Preview Forum
    7.2 View Forum
    

## To DOs

1. Topics
    Add Topics
    Edit Topics
    Delete Topics
2. Replies
    Add Replies
    Edit Replies
    Delete Replies
3. Voting
    Add Voting (Up and Downs)
    Unvote   