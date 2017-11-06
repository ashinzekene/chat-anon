## POLL ROUTES

- GET / - GET POLLS FOR USER 
- POST / - CREAT A POLL

- GET /all - GET ALL POLLS

- GET /:poll_id - GET A POLL - FELLOWS
- POST /:poll_id - EDIT A POLL - ADMINS | CREATOR
- DELETE /:poll_id - DELETE A POLL - ADMINS | `CREATOR`
- POST /:poll_id/vote/:option\_id VOTE IN A POLL - FELLOWS

## CIRCLE ROUTES

- GET / - GET CIRCLES FOR A USER
- POST / - CREATE A CIRCLE

- GET /:circle_id - GET A CIRCLE - FELLOW
- POST /:circle_id - UPDATE A CIRCLE - ADMIN
- DELETE /:cirlce_id - DELETE A CIRCLE - ADMIN

- POST /:circle_id/join - JOIN A CIRCLE REQUEST

- GET /:circle_id/felows - GET GROUP FELLOWS

- POST /:circle_id/fellow/:fellow\_id - ADD TO CIRCLE FELLOWS - ADMIN
- DELETE /:circle_id/fellow/:fellow\_id - REMOVE FROM CIRCLE FELLOWS - ADMIN
59f8bb697840c33464a1a10a
- POST /:circle_id/admin/:fellow\_id - ADD TO CIRCLE ADMINS - ADMIN
- DELETE /:circle_id/admin/:fellow\_id - REMOVE FROM CIRCLE ADMINS - ADMIN

## USER ROUTES

GET / - GET YOURSELF
POST / - CREATE A NEW USER

GET /:user_id - GET A USER
POST /:user_id - EDIT A USER | SAME USER

POST /:user/star/:poll - STAR OR UNSTAR A POLL


**POLLS ARE NOT ADDED TO CIRCLE MODEL ON CREATION**