# Microservice Experimentation
**Bintang Pradana Erlangga Putra (Belajar Plus)**

## Introduction
A microservice is a service that is designed to be run in a container.
In this case, the services consisted of a four web services namely 'api-gateway', 'auth-service', 'service-a' and 'service-b' depicted in the following architecture diagram:
![architecture diagram](docs/images/architecture.png)
The 'api-gateway' service is responsible for handling the requests from the clients and forwarding them to the other services.
The 'auth-service' service is responsible for handling authentication requests using JWT.
The 'service-a' and 'service-b' services are dummy services that are used to test the authentication.

## How it works
The following is the sequence diagram of the services:
![sequence diagram](docs/images/sequence.png)
Suppose we want to authenticate a user using JWT. We need to send a request to the 'auth-service' service through the 'api-gateway' service. The 'api-gateway' service will forward the request to the 'auth-service' service. The 'auth-service' service will then authenticate the user using JWT and return the token to the 'api-gateway' service. The 'api-gateway' service will then return the token to the client.
Afterward, the client can use the token to make requests to the other services without having to authenticate again. For example, the client make a request to the 'service-a' service which requires data from 'service-b' service.  The client make a request to the 'service-a' through the ;'api-gateway' service. The 'api-gateway' service will then forward the request to the 'service-a' service. The 'service-a' service will then send a request to the 'auth-service' service to verify the token. The 'auth-service' service will then verify the token and return the result to the 'service-a' service. After verifying the token, the 'service-a' service will then make a request directly to the 'service-b' service. The 'service-b' service will then send a request to the 'auth-service' service to verify the token. The 'auth-service' service will then verify the token and return the result to the 'service-b' service. The 'service-b' service will then return the data to the 'service-a' service and the 'service-a' service will then return the data to the 'api-gateway' service. The 'api-gateway' service will then return the data to the client.

## Running the experiment
To run the experiment, you need to install the following dependencies:
* [docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/compose/install/)

After installing the dependencies, you can run the experiment by running the following command:
```bash
docker-compose build
docker-compose up
```
You can access the experiment by visiting the following URL:
```
http://localhost:4000/ # This is the URL of the api-gateway service

# Auth Service
GET http://localhost:4000/auth/ # This is the URL of to check if the 'auth-service' service is running
POST http://localhost:4000/auth/ # This is the URL of to authenticate a user, by default the username is 'admin' and the password is 'password'

# Service A
GET http://localhost:4000/a/ # This is the URL of to check if the 'service-a' service is running
POST http://localhost:4000/a/auth # This is the URL of to make authentication request through the 'service-a' service
GET http://localhost:4000/a/b # This is the URL of to get the data from the 'service-b' service through the 'service-a' service

# Service B
GET http://localhost:4000/b/ # This is the URL of to check if the 'service-a' service is running
POST http://localhost:4000/b/auth # This is the URL of to make authentication request through the 'service-b' service
GET http://localhost:4000/b/a # This is the URL of to get the data from the 'service-a' service through the 'service-b' service
```