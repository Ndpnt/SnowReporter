Snow Reporter
=============

SnowReporter is a school project.

## How to use

### Dependencies ###

You will need:

- [Node.js](http://nodejs.org) v0.6.9+  /!\ do not install node v.0.6.11, the application won't work!
- [MongoDB](http://www.mongodb.org/downloads) v2.0+

### Install

    git clone git@github.com:Crozis/SnowReporter.git
    npm install -d	# install all necessary dependencies
                  	# prepare database storage
    sudo path/to/your/install/of/mongodb/bin/mongod	# start up MongoDB daemon; possibly see --dbpath option
    
### Start the application

    node app.js	# start the application

    you can simply hit `localhost:3000` on your favorite browser.

## Authors

- Nima Izadi
- Nicolas Dupont