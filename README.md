### TODOs
- [ ] fix double sign in (social + email)
- [ ] conenct backend with db
- [ ] auto create new entry in db for new user
- [ ] user roles
- [ ] landing page 
- [ ] account page
- [ ] dockerize
- [ ] deployment with github actions
- [x] password reset
- [ ] react-native frontend*

### Farm Stack Template

On the frontend
- react
- aws cognito (auth)
- tailwindcss

On the backend
- fastapi
- mongodb

For testing
- pytest
- browser stack

For deployment
- docker
- github actions



### Quick Start Guide
You'll need to setup (1) aws congito and signin with google and (2) mongodb before getting started. 

#### (1) aws congito 
- add aws amplify (for cognito only) to you project [here](https://docs.amplify.aws/start/getting-started/installation/q/integration/react/)
- create a user pool [here](https://docs.aws.amazon.com/cognito/latest/developerguide/tutorial-create-user-pool.html)
- setup google sign in [here](https://docs.amplify.aws/lib/auth/social/q/platform/js/#setup-frontend)

#### (2) mongodb
- spin up an atlas cluster [here](https://www.mongodb.com/docs/atlas/getting-started/)

