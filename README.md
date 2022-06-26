# REST Api for Questions and Answers Web App
Questions and Answers is a React Single Page App, where you can ask a question and have other users answer. Inspired by Quora.

The REST Api powers the app by providing an auth and a data service. Data is stored in MongoDB Atlas. The api itself is deployed on Heroku.

## App Feautures
### Auth
- Register / Login / Logout
- Register is two step - first username, first and last name and then optional profile picture upload

### Common
- Home page / Sorted by likes / Pagination
- Details
- Login / Logout
- Register

### User 
- Home page / Sorted by likes / Pagination / Add question field
- Details with additional options
- Edit 
- User Profile / All questions / All answers / Sorted by newest
- Spaces / Sorted by likes

### Users can:
- Post questions
- Answer questions
- Upvote and Downvote answers
- Create spaces
- Optional: Create personal feed by subscribing to different spaces
- Optional: Save best answers in personal collection

## REST Api Feautures
### Auth
- Route: '/auth'
	- POST: '/signup', 
	- POST: '/login', 
	- POST: '/logout'

### Root
- Route: '/api/'
- Returns REST Api meta data

### Data service
- Basic structure: '/data/:collection'

### Answers
- Route: '/answers' + quary
- GET: Get all answers / Sorted by likes / Paginated
- POST: Create new answer 

- Route: '/answers/:id'
- GET: Details page for answer with comments section
- PATCH: Upvote or downvote for users
- PUT, DELETE for owner

### Questions
- Route: '/questions' + quary
- GET: Get all questions 
- POST: Create new question

- Route: '/questions/:id'
- GET: Get all answers to the question
- DELETE for owner (can be deleted only if there are no answers)

## Data models

### User Model
- username
- firstName
- lastName
- bio
- imageUrl
- role ['user', 'moderator', 'admin']
- score
- password

### Question model
- body
- owner
- space
- hasAnswers

### Answer model
- body
- images
- owner
- question, ref: 'Question'
- likes

### Comment model
- body (only text)
- owner
- answer, ref: 'Answer'



