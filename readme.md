# SKYHUB in React Js

## Installation

1. Install Node.js : https://nodejs.org/en/download/
2. gitclone repository https://github.com/ibudisteanu/SkyHub-Frontend-React.js.git . You can also install and clone using **Git Desktop**

3. Open Command Prompt/Terminal and    
    1.    **cd** location\clone_repository\
4. npm install

## Running SkyHub Frontend

1. npm run dev -s

It will start on port 8080, and you can access the frontend server by http://127.0.0.1:8080/ 

### Installing the react-country-select module to be compatible 

1. Open react-country-select\index.js and remove the import of **require('react-select/dist/react-select.css');**
2. Open react-country-select\Package.json and add   "style": "dist/react-select.min.css",

#### Online Versions:

1. myskyhub.ddns.net:8080 for React Frontend
2. myskyhub.ddns.net:3000 for Express Backend with Redis Database


##### Working components

1. Login
2. Register
3. Facebook & Google integration, but I need to write the server processing code
4. Header Navigation Menu
5. Server Status Head Bar