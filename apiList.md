# DevTinder APIs

AUTH ROUTER::
- POST /signup
- POST /login
- POST /logout



PROFILE ROUTER::
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password




CONNECTION REQUEST ROUTER
- POST /request/send/intereted/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId


 USER ROUTER::
- GET /connections
- GET /requests/received
- GET /feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected