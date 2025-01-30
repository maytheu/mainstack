# Mainstack Assessment

Run the app locally, clone 

copy sample.env to .env

`npm install`

`npm run seed` to initialize the db

`npm start` to run the app

`npm test`

## Running with docker

install docker on your machine

clone the app 

Build the docker image from project root, run

`docker build --tag mainstack` 

Run docker container with env variable

`docker run -p3000:3000 -e MONGODB= -e PORT= -e JWT_SECRET= mainstack`


