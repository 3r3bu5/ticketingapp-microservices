# Ticketingapp microservices

### Technologies used

- **Virtualization** :
  - **Docker**: Dockerizing apps
  - **Kubernetes**: Container orchestration
  - **Skaffold**: Handles the workflow for building, pushing and deploying containers
  - **Ingress-nginx**: Ingress Controller
- **Backend**: Express.JS
- **Streaming system**: Nats-streaming
- **Database**: MongoDB , mongoose as ODM
- **Frontend**: Next.js
- **Endpoint validation**: Joi
- **Auth**: Passport & Passport-local & jsonwebtoken
- **Testing**: Jest & supertest
- **Extras**:
  - **Typescript**

### Features

- Consistent Error handling
- JWT auth based
- In-Memory Databases for Tests
- Server side rendering
- event streaming using nats-streaming-server

### Things I learned so far

- Data consistency is so crucial, you need to keep following the same structure you used over and over across all services.
- Seprate code that will be shared across the services into middleware or standalone services
- Testing each service is important to make sure that we covered all the requirements
- Cross namespace service communication
- Code sharing using npm
- how to solve concurrency problems of using streaming service
- Redirecting imports using jest
- Mock functions inside jest
- Convinece Document methods (mongoose)
