### Farm Stack Template
A plug and play fullstack template to kickstart your pojects...

On the frontend
- react
- tailwindcss
- auth with JWT (refresh and access store in multiple cookies)

On the backend
- fastapi
- mongodb

For auth 
- jwt refresh/access tokens
- tokens split between header and signature stored in secure cookies (signature cookie in http only)

For testing (under construction)
- pytest
- browser stack

For deployment (deplyment guide under construction)
- docker
- cloud run
- vercel



### Quick Start Guide


#### (1) mongodb
- spin up an atlas cluster [here](https://www.mongodb.com/docs/atlas/getting-started/)


### TODOs (feel free to make a PR)
- [ ] account page 
- [x] recaptcha
- [x] split tokens
- [ ] auth QA
- [ ] dashborad
- [x] password reset ui
- [ ] password reset captcha
- [x] react custom hooks

- [ ] key strokes for ui interactions (esc close modal, enter primary button...)
- [x] fix double sign in (social + email)
- [x] conenct backend with db
- [x] auto create new entry in db for new user
- [x] user roles
- [x] landing page 
- [x] dockerize
- [x] deployment with cloud run and vercel
- [x] password reset
- [x] fix toasts
- [x] css classes for common componentes (input, secondary button...)
- [ ] react-native frontend*
