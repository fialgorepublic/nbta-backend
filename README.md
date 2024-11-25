# nbta-backend

---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
   v20.13.1

    $ npm --version
    10.5.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

## Install

    $ git clone https://github.com/041Agency/nbta-backend.git
    $ cd PROJECT_TITLE
    $ npm install

## Configure app

Create .env then edit it with your settings. You will need:

- APP_PORT=
- DB_BASE_URI=
- DB_NAME=
- APP_JWT_KEY=

## Create Admin User
    $ npm run seed-dev
## Running the project

    $ npm run start-dev
