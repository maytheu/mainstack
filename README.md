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

`docker buildx build -t mainstack .` 

Run docker container with env variable

`docker run -p 30000:30000 -e MONGODB=mongodb+srv://Laue:7p4shcriIAgkEfXI@cluster0.buxmd.mongodb.net/mainstack -e PORT=30000 -e JWT_SECRET=nnkjkdjrnknnkjnroidnddnieiendklkmkdflmlmom mainstack`


`docker exec -it mainstack sh` to run interactive terminal

`npm run seed` to intializr db