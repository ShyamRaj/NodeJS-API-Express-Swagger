# NodeJS-API

### Exercise:

Develop and serve 3 simple REST API Endpoints from a docker container.

#### Notes:
* Use Typescript for development.
* Create a POST / PUT / GET API call to create, update and get profile info (First Name, Last Name, DoB, Address)
* Use any DB of your choice (assumed not given as a requirement)

#### Prerequisites
* Node LTS V10 and up
* Docker

#### Getting Started
* To get the app running locally run the following command
    ```
       npm run docker-compose-prod  
    ```
  
* To run the app in development mode
    ```
       npm run docker-compose-dev
    ```
* To run unit tests and view coverage report 
    ```
       npm run test
    ```
    to view the coverage report open the index.html file present inside the coverage folder in this path "coverage/lcov-report/index.html" 
